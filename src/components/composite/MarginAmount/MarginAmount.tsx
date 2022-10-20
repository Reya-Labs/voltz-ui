import React, { useCallback, useEffect, useState } from 'react';
import isUndefined from 'lodash/isUndefined';

import IconLabel from '../IconLabel/IconLabel';
import MaskedIntegerField from '../MaskedIntegerField/MaskedIntegerField';
import InputTokenLabel from '../InputTokenLabel/InputTokenLabel';
import { formatCurrency, toUSFormat } from '@utilities';
import { HealthFactorText } from '@components/composite';
import { useSwapFormContext, usePortfolioContext, usePositionContext } from '@contexts';

export type MarginAmountProps = {
  balance?: number;
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

const MarginAmount: React.FunctionComponent<MarginAmountProps> = ({
  balance,
  underlyingTokenName,
  defaultMargin,
  healthFactor,
  margin,
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
  
  const swapForm = useSwapFormContext();
  const positionForm = usePositionContext();

  let marginAmount;
  if (underlyingTokenName?.includes('USD')) {
    const portfolioMarginInfo = positionForm.position?.margin.toString();
    marginAmount = !isUndefined(portfolioMarginInfo) ? parseInt(portfolioMarginInfo)/1e6 : defaultMargin;
  } else {
    const portfolioMarginInfo = positionForm.position?.margin.toString();
    marginAmount = !isUndefined(portfolioMarginInfo) ? parseInt(portfolioMarginInfo) / 1e18 : defaultMargin;
  }
  const initialMarginRequirement = swapForm?.minRequiredMargin || defaultMargin;

  const maxAmountToWithdraw = !isUndefined(marginAmount) && !isUndefined(initialMarginRequirement) ? (marginAmount - initialMarginRequirement) : undefined;
  const formattedMaxAmountToWithdraw = !isUndefined(maxAmountToWithdraw) ? formatCurrency(maxAmountToWithdraw) : 'checking...';
  
  const formattedBalance = !isUndefined(balance) ? formatCurrency(balance) : 'checking...';
  const [inputValue, setInputValue] = useState<string | undefined>(defaultInputValue());

  useState(() => {
    if (isEditing) {
      onChangeMargin(0);
    }
  });

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
      allowDecimals
      allowNegativeValue={false}
      decimalsLimit={4}
      subtext={isAdditional ? `BALANCE: ${formattedBalance}` : `MAX WITHDRAWAL: ${formattedMaxAmountToWithdraw}` }
      suffix={<InputTokenLabel tokenName={underlyingTokenName || ''} />}
      suffixPadding={90}
      label={
        <IconLabel
          label={
            !isEditing
              ? 'Chosen margin'
              : isAdditional
              ? 'Margin amount to add'
              : 'Margin amount to withdraw'
          }
          icon="information-circle"
          info={
            isAdditional
              ? 'Your chosen margin is defined based on your leverage and notional amount traded. You are required to deposit margin in order to execute a trade.'
              : 'Margin in underlying tokens to withdraw from the margin account.'
          }
        />
      }
      labelRight={
        !isUndefined(healthFactor) ? <HealthFactorText healthFactor={healthFactor} /> : undefined
      }
      value={inputValue}
      onChange={handleChange}
      error={!!error}
      errorText={error}
    />
  );
};

export default MarginAmount;
