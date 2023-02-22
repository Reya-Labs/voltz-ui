import { CurrencyField, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import {
  refreshCashflows,
  selectNotionalAmount,
  setNotionalAmountAction,
} from '../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useAMMs } from '../../../../hooks/useAMMs';
import { NotionalAmountBox } from './NotionalAmount.styled';
type NotionalAmountProps = {};

export const NotionalAmount: React.FunctionComponent<NotionalAmountProps> = () => {
  //TODO Alex: get AMM as selected for this swap form
  const { aMMs, loading, error } = useAMMs();

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
      if (!loading && !error && aMMs.length > 0) {
        dispatch(
          refreshCashflows({
            amm: aMMs[0],
          }),
        );
      }
    },
    [dispatch, aMMs, loading, error],
  );

  return (
    <NotionalAmountBox>
      <Typography colorToken="lavenderWeb3" typographyToken="primaryBodyXSmallRegular">
        Notional amount
      </Typography>
      <CurrencyField suffix=" USDC" value={notionalAmount} onChange={handleOnChange} />
    </NotionalAmountBox>
  );
};
