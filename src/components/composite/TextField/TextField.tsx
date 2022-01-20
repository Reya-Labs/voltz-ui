import React from 'react';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

import { Input } from '../../atomic';

export type TextFieldProps = MuiTextFieldProps;

const TextField: React.FunctionComponent<TextFieldProps> = ({ ...props }) => {
  return (
    <MuiTextField
      {...props}
      inputProps={{ inputComponent: Input }}
      InputLabelProps={{ shrink: true }}
    />
  );
};

export default TextField;
