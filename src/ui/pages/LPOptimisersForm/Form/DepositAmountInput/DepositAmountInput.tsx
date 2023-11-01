import { TokenField, TokenFieldProps } from 'brokoli-ui';
import React, { useState } from 'react';

import { formFormatNumber, FormNumberLimits } from '../../../../../app/features/forms/common';
import { doNothing } from '../../../../../utilities/doNothing';
import { localeParseFloat } from '../../../../../utilities/localeParseFloat';
import { toUSFormat } from '../../../../../utilities/number';
import { DepositionAmountInputBox } from './DepositAmountInput.styled';

type Props = {
  subtext?: string;
  token: string;
  value: number;
  disabled: boolean;
  onChange?: (newValue: number) => void;
  walletBalance?: number;
  tokenName?: string;
};
export const DepositAmountInput: React.FunctionComponent<Props> = ({
  walletBalance,
  token,
  onChange = doNothing,
  disabled,
  value,
  tokenName,
}) => {
  const [inputValue, setInputValue] = useState(toUSFormat(value.toString()));
  const handleOnBlur = (nextValue: number) => {
    onChange(nextValue);
    setInputValue(toUSFormat(nextValue.toString()));
  };
  const subtext = `Wallet Balance: ${
    walletBalance === undefined ? '---' : `${formFormatNumber(walletBalance)} ${tokenName || ''}`
  }`;

  return (
    <DepositionAmountInputBox>
      <TokenField
        allowNegativeValue={false}
        bottomLeftText={subtext}
        bottomLeftTextColorToken="white400"
        bottomLeftTextTypographyToken="primaryBodySmallRegular"
        decimalsLimit={FormNumberLimits.decimalLimit}
        disabled={disabled}
        label="Amount"
        labelTypographyToken="primaryBodySmallRegular"
        maxLength={FormNumberLimits.digitLimit}
        token={token.toLowerCase() as TokenFieldProps['token']}
        tooltip="Choose the amount you wish to deposit into the strategy. Remember you won’t be able to withdraw until the pool matures."
        value={inputValue}
        onBlur={() => {
          const valueParsed = localeParseFloat(inputValue || '0');
          if (isNaN(valueParsed)) {
            handleOnBlur(0);
            return;
          }
          handleOnBlur(valueParsed);
        }}
        onChange={setInputValue}
      />
    </DepositionAmountInputBox>
  );
};
