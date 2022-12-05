import isUndefined from 'lodash.isundefined';
import React, { useState } from 'react';

import { toUSFormat } from '../../../utilities/number';
import { IconLabel } from '../IconLabel/IconLabel';
import { InputTokenLabel } from '../InputTokenLabel/InputTokenLabel';
import { MaskedIntegerField } from '../MaskedIntegerField/MaskedIntegerField';

export type NotionalAmountProps = {
  label: string;
  info: string;
  defaultNotional?: number;
  notional?: number;
  onChangeNotional: (value: number | undefined) => void;
  error?: string;
  underlyingTokenName?: string;
  subtext?: string;
  disabled?: boolean;
  isEditing?: boolean;
};

export const NotionalAmount: React.FunctionComponent<NotionalAmountProps> = ({
  label,
  info,
  defaultNotional,
  notional,
  onChangeNotional,
  error,
  underlyingTokenName,
  subtext,
  disabled,
  isEditing,
}) => {
  const value = isUndefined(notional) ? defaultNotional : notional;

  useState(() => {
    if (isEditing) {
      onChangeNotional(0);
    }
  });

  const handleChange = (newValue: string | undefined) => {
    const usFormatted = toUSFormat(newValue);
    onChangeNotional(!isUndefined(usFormatted) ? parseFloat(usFormatted) : undefined);
  };

  return (
    <MaskedIntegerField
      allowNegativeValue={false}
      defaultValue={value}
      disabled={disabled}
      error={!!error}
      errorText={error}
      label={<IconLabel icon="information-circle" info={info} label={label} />}
      subtext={subtext}
      suffix={<InputTokenLabel tokenName={underlyingTokenName || ''} />}
      suffixPadding={90}
      allowDecimals
      onChange={handleChange}
    />
  );
};
