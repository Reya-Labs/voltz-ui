import React from 'react';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { Input } from '../../atomic';

export type IntegerFieldProps = Omit<MuiTextFieldProps, 'variant'>;

const IntegerField: React.FunctionComponent<IntegerFieldProps> = ({
  label,
  disabled,
  ...props
}) => {
  return <Input label={label} disabled={disabled} type="number" />;
};

export default IntegerField;
