import { TokenField, TokenFieldProps } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback } from 'react';

import {
  getInfoPostSwapThunk,
  selectAvailableNotionals,
  selectMode,
  selectNotionalAmount,
  selectSwapFormAMM,
  setNotionalAmountAction,
} from '../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { formatNumber } from '../../../../utilities/number';
import { NotionalAmountFieldBox } from './NotionalAmountField.styled';
type NotionalAmountProps = {};

export const NotionalAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  const dispatch = useAppDispatch();

  const notionalAmount = useAppSelector(selectNotionalAmount);
  const mode = useAppSelector(selectMode);
  const availableNotionals = useAppSelector(selectAvailableNotionals);
  const aMM = useAppSelector(selectSwapFormAMM);

  const getInfoPostSwap = useCallback(
    debounce(() => {
      void dispatch(getInfoPostSwapThunk());
    }, 1000),
    [dispatch],
  );

  const handleOnChange = useCallback(
    (value?: string) => {
      if (!value) {
        return;
      }
      dispatch(
        setNotionalAmountAction({
          value,
        }),
      );

      getInfoPostSwap();
    },
    [dispatch, getInfoPostSwap],
  );

  return (
    <NotionalAmountFieldBox>
      <TokenField
        allowNegativeValue={false}
        bottomLeftText={notionalAmount.error ? notionalAmount.error : 'Liquidity Available'}
        bottomLeftTextColorToken={notionalAmount.error ? 'wildStrawberry3' : 'lavenderWeb3'}
        bottomRightTextColorToken={notionalAmount.error ? 'wildStrawberry' : 'lavenderWeb'}
        bottomRightTextTypographyToken="secondaryBodyXSmallRegular"
        bottomRightTextValue={formatNumber(availableNotionals.value[mode])}
        error={notionalAmount.error !== null}
        label="Notional amount"
        token={
          aMM ? (aMM.underlyingToken.name.toLowerCase() as TokenFieldProps['token']) : undefined
        }
        tooltip="When you swap rates, the amount you receive and pay is calculated as a percentage or the notional value you choose."
        value={notionalAmount.value}
        onChange={handleOnChange}
      />
    </NotionalAmountFieldBox>
  );
};
