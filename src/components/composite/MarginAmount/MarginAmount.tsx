import React, { useCallback, useEffect, useState } from 'react';
import isUndefined from 'lodash/isUndefined';

import IconLabel from '../IconLabel/IconLabel';
import MaskedIntegerField from '../MaskedIntegerField/MaskedIntegerField';
import InputTokenLabel from '../InputTokenLabel/InputTokenLabel';
import { formatCurrency } from '@utilities';
import { HealthFactorText } from '@components/composite';

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
  error
}) => {
  const defaultInputValue = () => {
    const defaultVal = (margin ?? defaultMargin)
    if (typeof defaultVal !== 'undefined') {
      return defaultVal.toString();
    }
  };

  const formattedBalance = !isUndefined(balance) ? formatCurrency(balance) : 'checking...';
  const [inputValue, setInputValue] = useState<string | undefined>(defaultInputValue());

  const handleChange = useCallback(
    (newValue: string | undefined) => {
      setInputValue(newValue);
      onChangeMargin(newValue ? parseFloat(newValue) : undefined);
    },
    [onChangeMargin, setInputValue],
  );

  // If the value prop changes, update the input field
  useEffect(() => {
    if(
      isUndefined(margin) && !isUndefined(inputValue) || 
      isUndefined(inputValue) && !isUndefined(margin) || 
      !isUndefined(inputValue) && !isUndefined(margin) && margin !== parseFloat(inputValue)
    ) {
      let newValue = margin?.toString();
      if(newValue !== undefined && newValue[newValue.length - 2] === '.') { 
        newValue = `${newValue}0`; // Add trailing zero if we get something like 100.5
      }
      setInputValue(newValue);
    }
  }, [inputValue, margin, setInputValue])

  return (
    <MaskedIntegerField
      allowDecimals
      allowNegativeValue={false}
      decimalsLimit={4}
      subtext={`BALANCE: ${formattedBalance}`}
      suffix={<InputTokenLabel tokenName={underlyingTokenName || ''} />}
      suffixPadding={90}
      label={
        <IconLabel
          label={ !isEditing ? 'Chosen margin' : isAdditional ? "Margin amount to add" : "Margin amount to withdraw" } 
          icon="information-circle"
          info={ isAdditional ? 
            "Your chosen margin is defined based on your leverage and notional amount traded. You are required to deposit margin in order to execute a trade." : 
            "Margin in underlying tokens to withdraw from the margin account." }
        />
      }
      labelRight={!isUndefined(healthFactor) ? <HealthFactorText healthFactor={healthFactor} /> : undefined}
      value={inputValue}
      onChange={handleChange}
      error={!!error}
      errorText={error}
    />
  );
};

export default MarginAmount;
