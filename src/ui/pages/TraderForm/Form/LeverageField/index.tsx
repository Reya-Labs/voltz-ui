import { showNotification } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  selectIsLeverageDisabled,
  selectLeverage,
  selectLeverageOptions,
  selectShowLeverageNotification,
  setLeverageAction,
} from '../../../../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useWallet } from '../../../../../hooks/useWallet';
import { stringToBigFloat } from '../../../../../utilities/number';
import { LeverageField as LeverageFieldComponent } from '../../../../components/LeverageField';
type NotionalAmountProps = {};

export const LeverageField: React.FunctionComponent<NotionalAmountProps> = () => {
  const dispatch = useAppDispatch();
  const leverage = useAppSelector(selectLeverage);
  const isLeverageDisabled = useAppSelector(selectIsLeverageDisabled);
  const [notificationRead, setNotificationRead] = useState(false);
  const { maxLeverage, leverageOptions } = useAppSelector(selectLeverageOptions);
  const { account } = useWallet();
  const [localLeverage, setLocalLeverage] = useState<string | undefined>(
    leverage ? leverage.toFixed(2) : '',
  );

  useEffect(() => {
    setLocalLeverage(leverage ? leverage.toFixed(2) : '');
  }, [leverage]);

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

  const debouncedSetLeverage = useMemo(
    () =>
      debounce((value: number | undefined, changeType: 'button' | 'input') => {
        dispatch(
          setLeverageAction({
            value: value === undefined ? NaN : value,
            account: account || '',
            changeType,
          }),
        );
      }, 300),
    [account, dispatch],
  );

  const handleOnChange = useCallback(
    (value: string | undefined, changeType: 'button' | 'input') => {
      setLocalLeverage(value);

      const valueAsNumber = value ? stringToBigFloat(value) : undefined;
      debouncedSetLeverage(valueAsNumber, changeType);
    },
    [debouncedSetLeverage],
  );

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
