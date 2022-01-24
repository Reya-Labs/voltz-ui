import React from 'react';
import MuiInput, { InputProps as MuiInputProps } from '@mui/material/Input';

export type IntegerInputProps = MuiInputProps;

const IntegerInput: React.FunctionComponent<IntegerInputProps> = ({ ...props }) => {
  return <MuiInput {...props} />;
};

export default IntegerInput;
