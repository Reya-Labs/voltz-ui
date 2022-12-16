import React from 'react';

import { IconLabel } from '../../../../../components/composite/IconLabel/IconLabel';
import { InputTokenLabel } from '../../../../../components/composite/InputTokenLabel/InputTokenLabel';
import { MaskedIntegerFieldStyled } from './DepositAmountInput.styled';

type Props = {
  subtext: string;
  token: string;
  disabled: boolean;
  onChange: (newValue: string | undefined) => void;
};
export const DepositAmountInput: React.FunctionComponent<Props> = ({
  subtext,
  token,
  onChange,
  disabled,
}) => (
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
    allowDecimals
    onChange={onChange}
  />
);
