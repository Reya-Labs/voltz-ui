import { CurrencyField, TypographyToken } from 'brokoli-ui';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  getInfoPostLpThunk,
  LpFormNumberLimits,
  selectLpFormAMM,
  selectUserInputFixedError,
  selectUserInputFixedLower,
  selectUserInputFixedUpdateCount,
  selectUserInputFixedUpper,
  setUserInputFixedLowerAction,
  setUserInputFixedUpperAction,
} from '../../../../../app/features/lp-form';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useResponsiveQuery } from '../../../../../hooks/useResponsiveQuery';
import { stringToBigFloat } from '../../../../../utilities/number';
import { FixedRangeFieldsBox } from './FixedRangeFields.styled';
type NotionalAmountProps = {};

export const FixedRangeFields: React.FunctionComponent<NotionalAmountProps> = () => {
  const aMM = useAppSelector(selectLpFormAMM);
  const dispatch = useAppDispatch();

  const fixedLower = useAppSelector(selectUserInputFixedLower);
  const fixedUpper = useAppSelector(selectUserInputFixedUpper);
  const fixedUpdateCount = useAppSelector(selectUserInputFixedUpdateCount);
  const fixedError = useAppSelector(selectUserInputFixedError);
  const { isLargeDesktopDevice } = useResponsiveQuery();
  const [localFixedLower, setLocalFixedLower] = useState<string>(fixedLower.toString());
  const [localFixedUpper, setLocalFixedUpper] = useState<string>(fixedUpper.toString());

  useEffect(() => {
    setLocalFixedUpper(fixedUpper.toString());
  }, [fixedUpper, fixedUpdateCount]);

  useEffect(() => {
    setLocalFixedLower(fixedLower.toString());
  }, [fixedLower, fixedUpdateCount]);

  const debouncedSetFixedLowerOnChange = useMemo(
    () =>
      debounce((value: number | null) => {
        dispatch(
          setUserInputFixedLowerAction({
            value,
          }),
        );
        void dispatch(getInfoPostLpThunk());
      }, 300),
    [dispatch],
  );

  const debouncedSetFixedUpperOnChange = useMemo(
    () =>
      debounce((value: number | null) => {
        dispatch(
          setUserInputFixedUpperAction({
            value,
          }),
        );
        void dispatch(getInfoPostLpThunk());
      }, 300),
    [dispatch],
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

  if (!aMM) {
    return null;
  }

  return (
    <FixedRangeFieldsBox>
      <CurrencyField
        allowNegativeValue={false}
        decimalsLimit={LpFormNumberLimits.fixedRangeDecimalLimit}
        disabled={false}
        error={Boolean(fixedError)}
        label="Fixed Low"
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
        decimalsLimit={LpFormNumberLimits.fixedRangeDecimalLimit}
        disabled={false}
        label="Fixed High"
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
