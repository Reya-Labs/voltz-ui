import { LeverageField as BrokoliLeverageField, showNotification } from 'brokoli-ui';
import React, { useCallback, useEffect, useState } from 'react';

import {
  selectIsLeverageDisabled,
  selectLeverage,
  selectLeverageOptions,
  selectShowLeverageNotification,
  setLeverageAction,
} from '../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { LeverageFieldBox } from './LeverageField.styled';
type NotionalAmountProps = {};

export const LeverageField: React.FunctionComponent<NotionalAmountProps> = () => {
  const dispatch = useAppDispatch();

  const leverage = useAppSelector(selectLeverage);
  const isLeverageDisabled = useAppSelector(selectIsLeverageDisabled);
  const [notificationRead, setNotificationRead] = useState(false);
  const { maxLeverage, leverageOptions } = useAppSelector(selectLeverageOptions);

  const showLowLeverageNotification = useAppSelector(selectShowLeverageNotification);

  useEffect(() => {
    if (!notificationRead && showLowLeverageNotification) {
      showNotification({
        title: 'Reminder',
        content:
          'If you take small amounts of leverage when trading rates , whilst your risk is lower, your payoff is likely to be low.',
        colorToken: 'orangeYellow',
        autoClose: 5000,
        onCloseNotification: () => setNotificationRead(true),
      });
    }
  }, [notificationRead, showLowLeverageNotification]);

  const handleOnChange = useCallback(
    (value: number) => {
      dispatch(
        setLeverageAction({
          value,
        }),
      );
    },
    [dispatch],
  );

  return (
    <LeverageFieldBox>
      <BrokoliLeverageField
        disabled={isLeverageDisabled || maxLeverage === '--'}
        label="Leverage"
        labelColorToken="lavenderWeb2"
        labelTypographyToken="primaryBodySmallRegular"
        leverageOptions={leverageOptions}
        maxLeverageColorToken="lavenderWeb3"
        maxLeverageText={`Max ${maxLeverage}x Leverage`}
        maxLeverageTypographyToken="primaryBodySmallRegular"
        tooltip="Leverage is notional amount divided by margin amount, and represents the maximum delta between the rates your position is collateralized to withstand."
        tooltipColorToken="lavenderWeb2"
        value={leverage || undefined}
        onLeverageChange={handleOnChange}
      />
    </LeverageFieldBox>
  );
};
