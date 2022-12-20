import React, { useState } from 'react';

import { IconLabel } from '../../../../../components/composite/IconLabel/IconLabel';
import { InputTokenLabel } from '../../../../../components/composite/InputTokenLabel/InputTokenLabel';
import { doNothing } from '../../../../../utilities/doNothing';
import { toUSFormat } from '../../../../../utilities/number';
import { MaskedIntegerFieldStyled } from './DepositAmountInput.styled';

type Props = {
  subtext: string;
  token: string;
  value: number;
  disabled: boolean;
  onChange?: (newValue: number) => void;
};
export const DepositAmountInput: React.FunctionComponent<Props> = ({
  subtext,
  token,
  onChange = doNothing,
  disabled,
  value,
}) => {
  const [inputValue, setInputValue] = useState(toUSFormat(value.toString()));
  const handleOnBlur = (nextValue: number) => {
    onChange(nextValue);
    setInputValue(toUSFormat(nextValue.toString()));
  };

  return (
    <MaskedIntegerFieldStyled
      allowNegativeValue={false}
      defaultValue={0}
      disabled={disabled}
      label={
        <IconLabel
          icon="information-circle"
          info={
            'Choose the amount you wish to deposit into the strategy. Remember you won’t be able to withdraw until the pool matures. '
          }
          label={'AMOUNT'}
        />
      }
      subtext={subtext}
      subtextSize={12}
      suffix={<InputTokenLabel tokenName={token} />}
      suffixPadding={90}
      value={inputValue}
      allowDecimals
      onBlur={() => {
        const valueParsed = parseFloat(inputValue || '0');
        if (isNaN(valueParsed)) {
          handleOnBlur(0);
          return;
        }
        handleOnBlur(valueParsed);
      }}
      onChange={setInputValue}
    />
  );
};
