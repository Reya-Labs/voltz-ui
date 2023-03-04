import { TokenField, TokenFieldProps } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  getInfoPostSwapThunk,
  selectMode,
  selectNotionalAmount,
  selectPoolSwapInfo,
  selectSwapFormAMM,
  setNotionalAmountAction,
  SwapFormNumberLimits,
} from '../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { formatNumber } from '../../../../utilities/number';
import { NotionalAmountFieldBox } from './NotionalAmountField.styled';
type NotionalAmountProps = {};

export const NotionalAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  const notionalAmount = useAppSelector(selectNotionalAmount);
  const mode = useAppSelector(selectMode);
  const poolSwapInfo = useAppSelector(selectPoolSwapInfo);
  const dispatch = useAppDispatch();
  const aMM = useAppSelector(selectSwapFormAMM);
  const [localNotionalAmount, setLocalNotionalAmount] = useState<string | undefined>(
    notionalAmount.value,
  );

  useEffect(() => {
    setLocalNotionalAmount(notionalAmount.value);
  }, [notionalAmount.value]);

  const debouncedGetInfoPostSwap = useMemo(
    () =>
      debounce((value: string | undefined) => {
        dispatch(
          setNotionalAmountAction({
            value: value || '',
          }),
        );
        void dispatch(getInfoPostSwapThunk());
      }, 300),
    [dispatch],
  );

  const handleOnChange = useCallback(
    (value?: string) => {
      setLocalNotionalAmount(value);
      debouncedGetInfoPostSwap(value);
    },
    [dispatch, debouncedGetInfoPostSwap],
  );

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

  return (
    <NotionalAmountFieldBox>
      <TokenField
        allowNegativeValue={false}
        bottomLeftText={notionalAmount.error ? notionalAmount.error : 'Liquidity Available'}
        bottomLeftTextColorToken={notionalAmount.error ? 'wildStrawberry' : 'lavenderWeb3'}
        bottomRightTextColorToken={notionalAmount.error ? 'wildStrawberry' : 'lavenderWeb'}
        bottomRightTextTypographyToken="secondaryBodyXSmallRegular"
        bottomRightTextValue={formatNumber(poolSwapInfo.availableNotional[mode])}
        decimalsLimit={SwapFormNumberLimits.decimalLimit}
        error={notionalAmount.error !== null}
        label="Notional amount"
        maxLength={SwapFormNumberLimits.digitLimit}
        token={aMM.underlyingToken.name.toLowerCase() as TokenFieldProps['token']}
        tooltip="When you swap rates, the amount you receive and pay is calculated as a percentage or the notional value you choose."
        value={localNotionalAmount}
        onChange={handleOnChange}
      />
    </NotionalAmountFieldBox>
  );
};
