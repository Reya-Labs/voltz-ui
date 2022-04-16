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
};

const MarginAmount: React.FunctionComponent<MarginAmountProps> = ({
  protocol,
  defaultMargin,
  margin,
  isAdditional,
  onChangeMargin,
}) => {
  const value = isUndefined(margin) ? defaultMargin : margin;
  const handleChange = (newValue: string) => {
    onChangeMargin(parseInt(newValue, 10));
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
      affix={underlyingTokenName}
      label={
        <IconLabel
          label={ isAdditional ? "additional margin amount" : "margin amount to withdraw" } 
          icon="information-circle"
          info={ isAdditional ? 
            "Your minimum required margin is defined based on your leverage and notional amount traded. You are required to deposit margin in order to execute a trade." : 
            "Margin in underlying tokens to withdraw from the margin account." }
        />
      }
      value={value}
      onChange={handleChange}
      sx={{ width: '100%' }}
    />
  );
};

export default MarginAmount;
