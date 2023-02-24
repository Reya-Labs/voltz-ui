import { TokenField } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  selectAvailableNotionals,
  selectMode,
  selectNotionalAmount,
  setNotionalAmountAction,
  updateCashflowCalculatorAction,
} from '../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useSwapFormAMM } from '../../../../hooks/useSwapFormAMM';
import { formatNumber } from '../../../../utilities/number';
import { NotionalAmountFieldBox } from './NotionalAmountField.styled';
type NotionalAmountProps = {};

export const NotionalAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  const { aMM } = useSwapFormAMM();

  const notionalAmount = useAppSelector(selectNotionalAmount);

  const mode = useAppSelector(selectMode);
  const availableNotionals = useAppSelector(selectAvailableNotionals);

  const dispatch = useAppDispatch();
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

      dispatch(updateCashflowCalculatorAction());
    },
    [dispatch, aMM],
  );

  // todo: Alex handle error logic, and other values
  return (
    <NotionalAmountFieldBox>
      <TokenField
        bottomLeftText={notionalAmount.error ? notionalAmount.error : 'Liquidity Available'}
        bottomLeftTextColorToken={notionalAmount.error ? 'wildStrawberry3' : 'lavenderWeb3'}
        bottomRightTextColorToken={notionalAmount.error ? 'wildStrawberry' : 'lavenderWeb'}
        bottomRightTextTypographyToken="secondaryBodyXSmallRegular"
        bottomRightTextValue={formatNumber(availableNotionals.value[mode])}
        error={notionalAmount.error !== null}
        label="Notional amount"
        token="usdc"
        tooltip="TODO: Tooltip message here!"
        value={notionalAmount.value}
        onChange={handleOnChange}
      />
    </NotionalAmountFieldBox>
  );
};
