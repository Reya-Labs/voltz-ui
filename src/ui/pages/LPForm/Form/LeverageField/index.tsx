import { showNotification } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  selectIsLeverageDisabled,
  selectLeverage,
  selectLeverageOptions,
  selectShowLeverageNotification,
  setLeverageAction,
} from '../../../../../app/features/lp-form';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { stringToBigFloat } from '../../../../../utilities/number';
import { LeverageField as LeverageFieldComponent } from '../../../../components/LeverageField';
type NotionalAmountProps = {};

export const LeverageField: React.FunctionComponent<NotionalAmountProps> = () => {
  const dispatch = useAppDispatch();
  const leverage = useAppSelector(selectLeverage);
  const isLeverageDisabled = useAppSelector(selectIsLeverageDisabled);
  const [notificationRead, setNotificationRead] = useState(false);
  const { maxLeverage, leverageOptions } = useAppSelector(selectLeverageOptions);

  const showLowLeverageNotification = useAppSelector(selectShowLeverageNotification);
  const [localLeverage, setLocalLeverage] = useState<string | undefined>(
    leverage ? leverage.toFixed(2) : '',
  );

  useEffect(() => {
    setLocalLeverage(leverage ? leverage.toFixed(2) : '');
  }, [leverage]);

  const debouncedSetLeverage = useMemo(
    () =>
      debounce((value?: number) => {
        dispatch(
          setLeverageAction({
            value: value === undefined ? NaN : value,
          }),
        );
      }, 300),
    [dispatch],
  );

  const handleOnChange = useCallback(
    (value?: string) => {
      setLocalLeverage(value);

      const valueAsNumber = value ? stringToBigFloat(value) : undefined;
      debouncedSetLeverage(valueAsNumber);
    },
    [debouncedSetLeverage],
  );

  useEffect(() => {
    if (!notificationRead && showLowLeverageNotification) {
      showNotification({
        title: 'Reminder',
        content:
          'If you take small amounts of leverage when providing liquidity, whilst your risk is lower, your payoff is likely to be low.',
        colorToken: 'orangeYellow',
        autoClose: 5000,
      });
      setNotificationRead(true);
    }
  }, [notificationRead, showLowLeverageNotification]);

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedSetLeverage.cancel();
    };
  }, []);

  return (
    <LeverageFieldComponent
      disabled={isLeverageDisabled || maxLeverage === '--'}
      error={!localLeverage}
      leverage={localLeverage}
      leverageOptions={leverageOptions}
      maxLeverage={maxLeverage}
      onLeverageChange={handleOnChange}
    />
  );
};
