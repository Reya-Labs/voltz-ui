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
import { stringToBigFloat } from '../../../../../utilities/number';
import { useResponsiveQuery } from '../../../../hooks/useResponsiveQuery';
import { NewNotionalAmountFieldUI } from './NewNotionalAmountFieldUI';

type NotionalAmountProps = {};
export const NotionalAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  const notionalAmount = useAppSelector(selectUserInputNotionalInfo);
  const isGetInfoPostLpLoading = useAppSelector(selectIsGetInfoPostLpLoading);
  const [localNotional, setLocalNotional] = useState<string | null>(
    notionalAmount.value.toString(),
  );
  const [getInfoPostLpNotional, setGetInfoPostLpNotional] = useState<string | null>(null);
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const dispatch = useAppDispatch();
  const aMM = useAppSelector(selectRolloverLpFormAMM);

  useEffect(() => {
    setLocalNotional(notionalAmount.value.toString());
  }, [notionalAmount.value]);

  const getInfoPostLp = useCallback(() => {
    setGetInfoPostLpNotional(localNotional);
    dispatch(resetInfoPostLpAction());
    void dispatch(getInfoPostLpThunk());
  }, [localNotional, dispatch]);

  const debouncedSetNotionalAmount = useMemo(
    () =>
      debounce((value: number | null | undefined) => {
        dispatch(
          setNotionalAmountAction({
            value: value === undefined ? undefined : value ?? 0,
          }),
        );
      }, 300),
    [dispatch],
  );

  const handleOnNotionalChange = useCallback(
    (value?: string) => {
      const valueAsNumber = value !== undefined && value !== null ? stringToBigFloat(value) : null;
      if (notionalAmount.value === valueAsNumber) {
        return;
      }
      setLocalNotional(value ?? null);
      debouncedSetNotionalAmount(valueAsNumber);
    },
    [notionalAmount.value, debouncedSetNotionalAmount],
  );

  const handleOnNotionalBlur = useCallback(() => {
    if (
      getInfoPostLpNotional !== null &&
      localNotional !== null &&
      getInfoPostLpNotional === localNotional
    ) {
      return;
    }
    getInfoPostLp();
  }, [getInfoPostLpNotional, localNotional, getInfoPostLp]);

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedSetNotionalAmount.cancel();
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
