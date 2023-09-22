import { LeverageField as BrokoliLeverageField, TypographyToken } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { stringToBigFloat } from '../../../utilities/number';
import { useResponsiveQuery } from '../../hooks/useResponsiveQuery';
import { LeverageFieldBox } from './LeverageField.styled';

type LeverageFieldProps = {
  disabled: boolean;
  leverageOptions: string[];
  maxLeverage: string;
  leverage: number | undefined | null;
  onLeverageChange: (leverage: number | undefined, changeType: 'button' | 'input') => void;
};
export const LeverageField: React.FunctionComponent<LeverageFieldProps> = ({
  leverageOptions,
  leverage,
  onLeverageChange,
  maxLeverage,
  disabled,
}) => {
  const { isLargeDesktopDevice } = useResponsiveQuery();
  const labelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodyMediumRegular'
    : 'primaryBodySmallRegular';

  const maxLeverageTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodySmallRegular'
    : 'primaryBodyXSmallRegular';

  const [localLeverage, setLocalLeverage] = useState<string | undefined>(
    leverage !== undefined && leverage !== null ? leverage.toFixed(2) : '',
  );

  useEffect(() => {
    setLocalLeverage(leverage !== undefined && leverage !== null ? leverage.toFixed(2) : '');
  }, [leverage]);

  const debouncedSetLeverage = useMemo(
    () =>
      debounce((value: number | undefined, changeType: 'button' | 'input') => {
        onLeverageChange && onLeverageChange(value, changeType);
      }, 300),
    [onLeverageChange],
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
    <LeverageFieldBox>
      <BrokoliLeverageField
        disabled={disabled}
        error={!localLeverage}
        label="Leverage"
        labelColorToken="lavenderWeb2"
        labelTypographyToken={labelTypographyToken}
        leverageOptions={leverageOptions}
        maxLeverageColorToken="lavenderWeb3"
        maxLeverageText={`Max ${maxLeverage}x Leverage`}
        maxLeverageTypographyToken={maxLeverageTypographyToken}
        tooltip="Leverage is the notional amount divided by the margin amount. The more leverage you take the higher your potential profit or loss."
        tooltipColorToken="lavenderWeb2"
        value={localLeverage}
        onLeverageChange={handleOnChange}
      />
    </LeverageFieldBox>
  );
};
