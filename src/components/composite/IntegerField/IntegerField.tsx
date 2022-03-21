import React from 'react';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

import { Input } from '../../atomic';

export type IntegerFieldProps = Omit<MuiTextFieldProps, 'variant'>;

const IntegerField: React.FunctionComponent<IntegerFieldProps> = ({
  size,
  label,
  disabled,
  error,
  value,
  onChange,
  ...props
}) => {
  return (
    <>
      <Input
        size={size}
        label={label}
        disabled={disabled}
        error={error}
        value={value}
        onChange={onChange}
        type="number"
      />
    </>
  );
};

export default IntegerField;
