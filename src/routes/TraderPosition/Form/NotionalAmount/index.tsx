import { CurrencyField, Typography } from 'brokoli-ui';
import React, { useCallback } from 'react';

import { selectNotionalAmount, setNotionalAmountAction } from '../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { NotionalAmountBox } from './NotionalAmount.styled';
type NotionalAmountProps = {};

export const NotionalAmount: React.FunctionComponent<NotionalAmountProps> = () => {
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
    },
    [dispatch],
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
