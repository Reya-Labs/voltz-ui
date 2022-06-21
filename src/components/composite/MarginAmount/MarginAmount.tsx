import React from 'react';
import isUndefined from 'lodash/isUndefined';

import IconLabel from '../IconLabel/IconLabel';
import MaskedIntegerField from '../MaskedIntegerField/MaskedIntegerField';
import InputTokenLabel from '../InputTokenLabel/InputTokenLabel';
import { formatCurrency } from '@utilities';

export type MarginAmountProps = {
  balance?: number;
  protocol?: string;
  defaultMargin?: number;
  maxMargin?: number;
  margin?: number;
  isAdditional?: boolean;
  isEditing?: boolean;
  onChangeMargin: (value: number) => void;
  error?: string;
};

const MarginAmount: React.FunctionComponent<MarginAmountProps> = ({
  balance,
  protocol,
  defaultMargin,
  margin,
  isAdditional,
  isEditing,
  onChangeMargin,
  error
}) => {
  const formattedBalance = !isUndefined(balance) ? formatCurrency(balance) : 'checking...';
  const value = isUndefined(margin) ? defaultMargin : margin;
  const handleChange = (newValue: string) => {
    onChangeMargin(parseFloat(newValue));
  };

  // todo: below is a workaround when deriving the token name from the protocol name, needs to be fixed

  let isAdditionalMarginAmount: boolean;

  if (isUndefined(isAdditional)) {
    isAdditionalMarginAmount = false;
  } else {
    isAdditionalMarginAmount = isAdditional;
  }

  let underlyingTokenName: string = '';

  if (protocol) {
    underlyingTokenName = protocol.substring(1);
  }

  return (
    <MaskedIntegerField
      allowDecimals
      allowNegativeValue={false}
      decimalsLimit={2}
      subtext={`BALANCE: ${formattedBalance}`}
      suffix={<InputTokenLabel tokenName={underlyingTokenName} />}
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
      value={value}
      onChange={handleChange}
      error={!!error}
      errorText={error}
    />
  );
};

export default MarginAmount;
