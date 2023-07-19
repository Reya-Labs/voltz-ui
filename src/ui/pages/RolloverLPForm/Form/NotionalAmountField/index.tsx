import { TypographyToken } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  getInfoPostLpThunk,
  resetInfoPostLpAction,
  selectIsGetInfoPostLpLoading,
  selectRolloverLpFormAMM,
  selectUserInputNotionalInfo,
  setNotionalAmountAction,
} from '../../../../../app/features/forms/lps/rollover-lp';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import { stringToBigFloat } from '../../../../../utilities/number';
import { NewNotionalAmountFieldUI } from './NewNotionalAmountFieldUI';

type NotionalAmountProps = {};
export const NotionalAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  const notionalAmount = useAppSelector(selectUserInputNotionalInfo);
  const isGetInfoPostLpLoading = useAppSelector(selectIsGetInfoPostLpLoading);
  const [localNotional, setLocalNotional] = useState<string | null>(
    notionalAmount.value.toString(),
  );
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const dispatch = useAppDispatch();
  const aMM = useAppSelector(selectRolloverLpFormAMM);

  useEffect(() => {
    setLocalNotional(notionalAmount.value.toString());
  }, [notionalAmount.value]);

  const debouncedGetInfoPostLp = useMemo(
    () =>
      debounce((value: number | null | undefined) => {
        dispatch(resetInfoPostLpAction());
        dispatch(
          setNotionalAmountAction({
            value: value === undefined ? undefined : value ?? 0,
          }),
        );
        void dispatch(getInfoPostLpThunk());
      }, 300),
    [dispatch],
  );

  const handleOnNotionalChange = useCallback(
    (value?: string) => {
      setLocalNotional(value ?? null);

      const valueAsNumber = value !== undefined ? stringToBigFloat(value) : null;
      debouncedGetInfoPostLp(valueAsNumber);
    },
    [debouncedGetInfoPostLp],
  );

  const handleOnNotionalBlur = useCallback(() => {
    const valueAsNumber =
      localNotional !== undefined && localNotional !== null
        ? stringToBigFloat(localNotional)
        : null;
    if (notionalAmount.value === valueAsNumber) {
      return;
    }

    debouncedGetInfoPostLp(valueAsNumber);
  }, [notionalAmount.value, localNotional, debouncedGetInfoPostLp]);

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedGetInfoPostLp.cancel();
    };
  }, []);

  if (!aMM) {
    return null;
  }

  const labelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodyMediumRegular'
    : 'primaryBodySmallRegular';

  const bottomRightTextTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  const bottomLeftTextTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  return (
    <NewNotionalAmountFieldUI
      bottomLeftTextTypographyToken={bottomLeftTextTypographyToken}
      bottomRightTextTypographyToken={bottomRightTextTypographyToken}
      disabled={isGetInfoPostLpLoading}
      handleOnNotionalBlur={handleOnNotionalBlur}
      handleOnNotionalChange={handleOnNotionalChange}
      labelTypographyToken={labelTypographyToken}
      localNotional={localNotional}
      underlyingTokenName={aMM.underlyingToken.name}
    />
  );
};
