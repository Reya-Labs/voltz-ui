import React from 'react';
import isUndefined from 'lodash/isUndefined';

import IconLabel from '../IconLabel/IconLabel';
import MaskedIntegerField from '../MaskedIntegerField/MaskedIntegerField';

export type MarginAmountProps = {
  protocol?: string;
  defaultMargin?: number;
  maxMargin?: number;
  margin?: number;
  isAdditional?: boolean;
  onChangeMargin: (value: number) => void;
  error?: string;
};

const MarginAmount: React.FunctionComponent<MarginAmountProps> = ({
  protocol,
  defaultMargin,
  margin,
  isAdditional,
  onChangeMargin,
  error
}) => {
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
      suffix={underlyingTokenName}
      label={
        <IconLabel
          label={ isAdditional ? "Minimum Required Margin" : "Margin amount to withdraw" } 
          icon="information-circle"
          info={ isAdditional ? 
            "Your minimum required margin is defined based on your leverage and notional amount traded. You are required to deposit margin in order to execute a trade." : 
            "Margin in underlying tokens to withdraw from the margin account." }
        />
      }
      defaultValue={value}
      onChange={handleChange}
      error={!!error}
      errorText={error}
    />
  );
};

export default MarginAmount;
