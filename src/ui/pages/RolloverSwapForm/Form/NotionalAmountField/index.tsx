import { TypographyToken } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  getInfoPostSwapThunk,
  selectIsGetInfoPostSwapLoading,
  selectRolloverSwapFormAMM,
  selectUserInputNotionalInfo,
  setNotionalAmountAction,
} from '../../../../../app/features/forms/trader/rollover-swap';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import { stringToBigFloat } from '../../../../../utilities/number';
import { NewNotionalAmountFieldUI } from './NewNotionalAmountFieldUI';

type NotionalAmountProps = {};
export const NotionalAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  const notionalAmount = useAppSelector(selectUserInputNotionalInfo);
  const isGetInfoPostSwapLoading = useAppSelector(selectIsGetInfoPostSwapLoading);
  const [localNotional, setLocalNotional] = useState<string | null>(
    notionalAmount.value.toString(),
  );
  const { isLargeDesktopDevice } = useResponsiveQuery();

  const dispatch = useAppDispatch();
  const aMM = useAppSelector(selectRolloverSwapFormAMM);

  useEffect(() => {
    setLocalNotional(notionalAmount.value.toString());
  }, [notionalAmount.value]);

  const debouncedGetInfoPostSwap = useMemo(
    () =>
      debounce((value: number | null | undefined) => {
        dispatch(
          setNotionalAmountAction({
            value: value === undefined ? undefined : value ?? 0,
          }),
        );
        void dispatch(getInfoPostSwapThunk());
      }, 300),
    [dispatch],
  );

  const handleOnNotionalChange = useCallback((value?: string) => {
    setLocalNotional(value ?? null);
  }, []);

  const handleOnNotionalBlur = useCallback(() => {
    const valueAsNumber =
      localNotional !== undefined && localNotional !== null
        ? stringToBigFloat(localNotional)
        : null;
    debouncedGetInfoPostSwap(valueAsNumber);
  }, [localNotional, debouncedGetInfoPostSwap]);

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedGetInfoPostSwap.cancel();
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
      disabled={isGetInfoPostSwapLoading}
      handleOnNotionalBlur={handleOnNotionalBlur}
      handleOnNotionalChange={handleOnNotionalChange}
      labelTypographyToken={labelTypographyToken}
      localNotional={localNotional}
      underlyingTokenName={aMM.underlyingToken.name}
    />
  );
};
