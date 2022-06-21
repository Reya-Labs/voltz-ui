import React from 'react';
import { Input } from '../../atomic';
import { TextFieldProps } from '../TextField/TextField';
import { inputStyles } from '@theme';

export type IntegerFieldProps = TextFieldProps;

const IntegerField: React.FunctionComponent<IntegerFieldProps> = ({
  size,
  label,
  disabled,
  error,
  value,
  onChange,
}) => {
  return (
    <Input
      label={label}
      disabled={disabled}
      error={error}
      value={value}
      onChange={onChange}
      type="number"
      sx={{ input: inputStyles({ disabled, error, inputSize: size }) }}
    />
  );
};

export default IntegerField;
