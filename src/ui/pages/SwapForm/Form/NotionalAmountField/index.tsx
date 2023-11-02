import { TypographyToken } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../app';
import {
  selectIsGetInfoPostSwapLoading,
  selectSwapFormPool,
  selectUserInputNotionalInfo,
  setNotionalAmountAction,
  simulateSwapThunk,
} from '../../../../../app/features/forms/trader/swap';
import { stringToBigFloat } from '../../../../../utilities/number';
import { NewNotionalAmountFieldUI } from './NewNotionalAmountFieldUI';

type NotionalAmountProps = {};
export const NotionalAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  const notionalAmount = useAppSelector(selectUserInputNotionalInfo);
  const isGetInfoPostSwapLoading = useAppSelector(selectIsGetInfoPostSwapLoading);
  const [localNotional, setLocalNotional] = useState<string | null>(
    notionalAmount.value.toString(),
  );
  const [getInfoPostSwapNotional, setGetInfoPostSwapNotional] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const pool = useAppSelector(selectSwapFormPool);

  useEffect(() => {
    setLocalNotional(notionalAmount.value.toString());
  }, [notionalAmount.value]);

  const getInfoPostSwap = useCallback(() => {
    setGetInfoPostSwapNotional(localNotional);
    void dispatch(simulateSwapThunk({}));
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
      getInfoPostSwapNotional !== null &&
      localNotional !== null &&
      getInfoPostSwapNotional === localNotional
    ) {
      return;
    }
    getInfoPostSwap();
  }, [getInfoPostSwapNotional, localNotional, getInfoPostSwap]);

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedSetNotionalAmount.cancel();
    };
  }, []);

  if (!pool) {
    return null;
  }

  const labelTypographyToken: TypographyToken = 'primaryBodySmallBold';
  const bottomRightTextTypographyToken: TypographyToken = 'primaryBodyXSmallRegular';
  const bottomLeftTextTypographyToken: TypographyToken = 'primaryBodyXSmallRegular';

  return (
    <NewNotionalAmountFieldUI
      bottomLeftTextTypographyToken={bottomLeftTextTypographyToken}
      bottomRightTextTypographyToken={bottomRightTextTypographyToken}
      disabled={isGetInfoPostSwapLoading}
      handleOnNotionalBlur={handleOnNotionalBlur}
      handleOnNotionalChange={handleOnNotionalChange}
      labelTypographyToken={labelTypographyToken}
      localNotional={localNotional}
      underlyingTokenName={pool.underlyingToken.name}
    />
  );
};
