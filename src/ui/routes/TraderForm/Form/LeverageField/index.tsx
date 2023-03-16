import {
  LeverageField as BrokoliLeverageField,
  showNotification,
  TypographyToken,
} from 'brokoli-ui';
import React, { useCallback, useEffect, useState } from 'react';

import {
  selectIsLeverageDisabled,
  selectLeverage,
  selectLeverageOptions,
  selectShowLeverageNotification,
  setLeverageAction,
} from '../../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import { LeverageFieldBox } from './LeverageField.styled';
type NotionalAmountProps = {};

export const LeverageField: React.FunctionComponent<NotionalAmountProps> = () => {
  const dispatch = useAppDispatch();
  const { isLargeDesktopDevice } = useResponsiveQuery();
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

  const labelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodyMediumRegular'
    : 'primaryBodySmallRegular';

  const maxLeverageTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  return (
    <LeverageFieldBox>
      <BrokoliLeverageField
        disabled={isLeverageDisabled || maxLeverage === '--'}
        label="Leverage"
        labelColorToken="lavenderWeb2"
        labelTypographyToken={labelTypographyToken}
        leverageOptions={leverageOptions}
        maxLeverageColorToken="lavenderWeb3"
        maxLeverageText={`Max ${maxLeverage}x Leverage`}
        maxLeverageTypographyToken={maxLeverageTypographyToken}
        tooltip="Leverage is the notional amount divided by the margin amount. The more leverage you take the higher your potential profit or loss."
        tooltipColorToken="lavenderWeb2"
        value={leverage || undefined}
        onLeverageChange={handleOnChange}
      />
    </LeverageFieldBox>
  );
};
