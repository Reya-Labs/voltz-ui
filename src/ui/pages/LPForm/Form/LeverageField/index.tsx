import { showNotification } from 'brokoli-ui';
import React, { useCallback, useEffect, useState } from 'react';

import {
  selectIsLeverageDisabled,
  selectLeverage,
  selectLeverageOptions,
  selectShowLeverageNotification,
  setLeverageAction,
} from '../../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { LeverageField as LeverageFieldComponent } from '../../../../components/LeverageField';
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
      });
      setNotificationRead(true);
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
    <LeverageFieldComponent
      disabled={isLeverageDisabled || maxLeverage === '--'}
      leverage={leverage || undefined}
      leverageOptions={leverageOptions}
      maxLeverage={maxLeverage}
      onLeverageChange={handleOnChange}
    />
  );
};
