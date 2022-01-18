import React from 'react';
import { styled } from '@mui/system';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

import { colors } from '@theme';

export type TextFieldProps = MuiTextFieldProps;

const TextField: React.FunctionComponent<TextFieldProps> = ({ ...props }) => {
  return <MuiTextField {...props} />;
};

export default styled(TextField)(({ theme }) => ({
  color: colors.apeBlueGreenLight,
}));
