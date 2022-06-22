import React from 'react';
import isUndefined from 'lodash/isUndefined';

import IconLabel from '../IconLabel/IconLabel';
import MaskedIntegerField from '../MaskedIntegerField/MaskedIntegerField';
import InputTokenLabel from '../InputTokenLabel/InputTokenLabel';

export type NotionalAmountProps = {
  label: string;
  info: string;
  protocol?: string;
  defaultNotional?: number;
  notional?: number;
  onChangeNotional: (value: number | undefined) => void;
  error?: string;
};

const NotionalAmount: React.FunctionComponent<NotionalAmountProps> = ({
  label,
  info,
  protocol,
  defaultNotional,
  notional,
  onChangeNotional,
  error,
}) => {
  const value = isUndefined(notional) ? defaultNotional : notional;
  const handleChange = (newValue: string | undefined) => {
    onChangeNotional(newValue ? parseFloat(newValue) : undefined);
  };

  // todo: below is a workaround when deriving the token name from the protocol name, needs to be fixed

  let underlyingTokenName: string = '';

  if (protocol) {
    underlyingTokenName = protocol.substring(1);
  }

  return (
    <MaskedIntegerField
      allowDecimals
      allowNegativeValue={false}
      suffix={<InputTokenLabel tokenName={underlyingTokenName} />}
      suffixPadding={90}
      label={<IconLabel label={label} icon="information-circle" info={info} />}
      defaultValue={value}
      onChange={handleChange}
      error={!!error}
      errorText={error}
    />
  );
};

export default NotionalAmount;
