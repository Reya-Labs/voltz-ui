import React, { useState } from 'react';
import isUndefined from 'lodash/isUndefined';

import { IconLabel } from '../IconLabel/IconLabel';
import { MaskedIntegerField } from '../MaskedIntegerField/MaskedIntegerField';
import { InputTokenLabel } from '../InputTokenLabel/InputTokenLabel';
import { toUSFormat } from '../../../utilities/number';

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
      allowDecimals
      allowNegativeValue={false}
      suffix={<InputTokenLabel tokenName={underlyingTokenName || ''} />}
      suffixPadding={90}
      label={<IconLabel label={label} icon="information-circle" info={info} />}
      defaultValue={value}
      onChange={handleChange}
      error={!!error}
      errorText={error}
      subtext={subtext}
      disabled={disabled}
    />
  );
};
