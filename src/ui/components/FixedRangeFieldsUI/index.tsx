import { CurrencyField, TypographyToken } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { FormNumberLimits } from '../../../app/features/forms/common';
import { stringToBigFloat } from '../../../utilities/number';
import { useResponsiveQuery } from '../../hooks/useResponsiveQuery';
import { FixedRangeFieldsBox } from './FixedRangeFieldsUI.styled';
type FixedRangeFieldsUIProps = {
  fixedLower: string;
  fixedUpper: string;
  fixedUpdateCount: number;
  error: boolean;
  onChangeFixedLower: (value: number | null) => void;
  onChangeFixedUpper: (value: number | null) => void;
};

export const FixedRangeFieldsUI: React.FunctionComponent<FixedRangeFieldsUIProps> = ({
  fixedLower,
  fixedUpper,
  fixedUpdateCount,
  error,
  onChangeFixedLower,
  onChangeFixedUpper,
}) => {
  const [localFixedLower, setLocalFixedLower] = useState<string>(fixedLower);
  const [localFixedUpper, setLocalFixedUpper] = useState<string>(fixedUpper);
  const { isLargeDesktopDevice } = useResponsiveQuery();

  useEffect(() => {
    setLocalFixedUpper(fixedUpper);
  }, [fixedUpper, fixedUpdateCount]);

  useEffect(() => {
    setLocalFixedLower(fixedLower);
  }, [fixedLower, fixedUpdateCount]);

  const debouncedSetFixedLowerOnChange = useMemo(
    () =>
      debounce((value: number | null) => {
        onChangeFixedLower && onChangeFixedLower(value);
      }, 300),
    [onChangeFixedLower],
  );

  const debouncedSetFixedUpperOnChange = useMemo(
    () =>
      debounce((value: number | null) => {
        onChangeFixedUpper && onChangeFixedUpper(value);
      }, 300),
    [onChangeFixedUpper],
  );

  const handleFixedLowerOnChange = useCallback((value: string | undefined) => {
    setLocalFixedLower(value ?? '');
  }, []);

  const handleFixedUpperOnChange = useCallback((value: string | undefined) => {
    setLocalFixedUpper(value ?? '');
  }, []);

  const handleFixedLowerOnBlur = useCallback(() => {
    const valueAsNumber = localFixedLower !== undefined ? stringToBigFloat(localFixedLower) : null;
    debouncedSetFixedLowerOnChange(valueAsNumber);
  }, [localFixedLower, debouncedSetFixedLowerOnChange]);

  const handleFixedUpperOnBlur = useCallback(() => {
    const valueAsNumber = localFixedUpper !== undefined ? stringToBigFloat(localFixedUpper) : null;
    debouncedSetFixedUpperOnChange(valueAsNumber);
  }, [localFixedUpper, debouncedSetFixedUpperOnChange]);

  // Stop the invocation of the debounced function
  // after unmounting
  useEffect(() => {
    return () => {
      debouncedSetFixedLowerOnChange.cancel();
      debouncedSetFixedUpperOnChange.cancel();
    };
  }, []);

  const labelTypographyToken: TypographyToken = isLargeDesktopDevice
    ? 'primaryBodyMediumRegular'
    : 'primaryBodySmallRegular';

  return (
    <FixedRangeFieldsBox>
      <CurrencyField
        allowNegativeValue={false}
        decimalsLimit={FormNumberLimits.fixedRangeDecimalLimit}
        disabled={false}
        error={error}
        label="Fixed Rate Low"
        labelColorToken="lavenderWeb3"
        labelTypographyToken={labelTypographyToken}
        suffix="%"
        tooltip="The lowest rate of the fixed rate range within which to deposit liquidity."
        tooltipColorToken="lavenderWeb3"
        value={localFixedLower}
        onBlur={handleFixedLowerOnBlur}
        onChange={handleFixedLowerOnChange}
      />
      <CurrencyField
        allowNegativeValue={false}
        decimalsLimit={FormNumberLimits.fixedRangeDecimalLimit}
        disabled={false}
        label="Fixed Rate High"
        labelColorToken="lavenderWeb3"
        labelTypographyToken={labelTypographyToken}
        suffix="%"
        tooltip="The highest rate of the fixed rate range within which to deposit liquidity."
        tooltipColorToken="lavenderWeb3"
        value={localFixedUpper}
        onBlur={handleFixedUpperOnBlur}
        onChange={handleFixedUpperOnChange}
      />
    </FixedRangeFieldsBox>
  );
};
