import { TokenField } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  selectNotionalAmount,
  setNotionalAmountAction,
  updateCashflowCalculatorAction,
} from '../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useSwapFormAMM } from '../../../../hooks/useSwapFormAMM';
import { NotionalAmountFieldBox } from './NotionalAmountField.styled';
type NotionalAmountProps = {};

export const NotionalAmountField: React.FunctionComponent<NotionalAmountProps> = () => {
  const { aMM } = useSwapFormAMM();

  const notionalAmount = useAppSelector(selectNotionalAmount);
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
      if (aMM) {
        dispatch(updateCashflowCalculatorAction());
      }
    },
    [dispatch, aMM],
  );

  // todo: Alex handle error logic, and other values
  return (
    <NotionalAmountFieldBox>
      <TokenField
        bottomLeftText="Fixed Liquidity Available"
        bottomRightTextColorToken="lavenderWeb"
        bottomRightTextTypographyToken="secondaryBodyXSmallRegular"
        bottomRightTextValue={290000.34}
        error={false}
        label="Notional amount"
        token="usdc"
        tooltip="TODO: Tooltip message here!"
        value={notionalAmount}
        onChange={handleOnChange}
      />
    </NotionalAmountFieldBox>
  );
};
