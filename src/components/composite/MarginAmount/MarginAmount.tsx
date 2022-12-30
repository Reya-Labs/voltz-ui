import isUndefined from 'lodash.isundefined';
import React, { useCallback, useEffect, useState } from 'react';

import { usePositionContext } from '../../../contexts/PositionContext/PositionContext';
import { formatCurrency, toUSFormat } from '../../../utilities/number';
import { HealthFactorText } from '../HealthFactorText/HealthFactorText';
import { IconLabel } from '../IconLabel/IconLabel';
import { InputTokenLabel } from '../InputTokenLabel/InputTokenLabel';
import { MaskedIntegerField } from '../MaskedIntegerField/MaskedIntegerField';

export type MarginAmountProps = {
  balance?: number;
  currentPositionMarginRequirement?: number;
  underlyingTokenName?: string;
  defaultMargin?: number;
  healthFactor?: number;
  maxMargin?: number;
  margin?: number;
  isAdditional?: boolean;
  isEditing?: boolean;
  onChangeMargin: (value: number | undefined) => void;
  error?: string;
};

export const MarginAmount: React.FunctionComponent<MarginAmountProps> = ({
  balance,
  underlyingTokenName,
  defaultMargin,
  healthFactor,
  margin,
  currentPositionMarginRequirement,
  isAdditional,
  isEditing,
  onChangeMargin,
  error,
}) => {
  const defaultInputValue = () => {
    const defaultVal = isEditing ? defaultMargin : margin ?? defaultMargin;
    if (typeof defaultVal !== 'undefined') {
      return defaultVal.toString();
    }
  };

  const { position } = usePositionContext();

  const portfolioMarginInfo = position?.margin;
  const marginAmount = portfolioMarginInfo || defaultMargin;
  const initialMarginRequirement = currentPositionMarginRequirement || defaultMargin;

  const maxAmountToWithdraw =
    !isUndefined(marginAmount) && !isUndefined(initialMarginRequirement)
      ? Math.floor(Math.max(marginAmount - initialMarginRequirement, 0) * 10000) / 10000
      : undefined;

  const formattedMaxAmountToWithdraw = !isUndefined(maxAmountToWithdraw)
    ? formatCurrency(maxAmountToWithdraw, false, false, 2, 4)
    : 'checking...';

  const formattedBalance = !isUndefined(balance) ? formatCurrency(balance) : 'checking...';
  const [inputValue, setInputValue] = useState<string | undefined>(defaultInputValue());

  const handleChange = useCallback(
    (newValue: string | undefined) => {
      const usFormatted = toUSFormat(newValue);
      setInputValue(newValue);
      onChangeMargin(usFormatted ? parseFloat(usFormatted) : undefined);
    },
    [onChangeMargin, setInputValue],
  );

  useEffect(() => {
    const usFormatted = toUSFormat(inputValue);
    if (
      !isUndefined(usFormatted) &&
      !isUndefined(margin) &&
      margin !== parseFloat(usFormatted) &&
      isEditing
    ) {
      onChangeMargin(parseFloat(usFormatted));
    }
  }, [margin]);

  // If the value prop changes, update the input field
  useEffect(() => {
    const usFormatted = toUSFormat(inputValue);
    if (
      !isEditing &&
      ((isUndefined(margin) && !isUndefined(inputValue)) ||
        (isUndefined(inputValue) && !isUndefined(margin)) ||
        (!isUndefined(usFormatted) && !isUndefined(margin) && margin !== parseFloat(usFormatted)))
    ) {
      let newValue = margin?.toString();
      if (newValue !== undefined && newValue[newValue.length - 2] === '.') {
        newValue = `${newValue}0`; // Add trailing zero if we get something like 100.5
      }
      setInputValue(toUSFormat(newValue));
    }
  }, [inputValue, margin, setInputValue]);

  return (
    <MaskedIntegerField
      allowNegativeValue={false}
      decimalsLimit={4}
      error={!!error}
      errorText={error}
      label={
        <IconLabel
          icon="information-circle"
          info={
            isAdditional
              ? 'Your chosen margin is defined based on your leverage and notional amount traded. You are required to deposit margin in order to execute a trade.'
              : 'Margin in underlying tokens to withdraw from the margin account.'
          }
          label={
            !isEditing
              ? 'Chosen margin'
              : isAdditional
              ? 'Margin amount to add'
              : 'Margin amount to withdraw'
          }
        />
      }
      labelRight={
        !isUndefined(healthFactor) ? <HealthFactorText healthFactor={healthFactor} /> : undefined
      }
      subtext={
        isAdditional
          ? `BALANCE: ${formattedBalance}`
          : `MAX WITHDRAWAL: ${formattedMaxAmountToWithdraw}`
      }
      suffix={<InputTokenLabel tokenName={underlyingTokenName || ''} />}
      suffixPadding={90}
      value={inputValue}
      allowDecimals
      onChange={handleChange}
    />
  );
};
