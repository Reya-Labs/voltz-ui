import React from 'react';
import { styled } from '@mui/system';
import MuiInput, { InputProps as MuiInputProps } from '@mui/material/Input';

import { colors } from '@theme';

export type InputProps = MuiInputProps;

const Input: React.FunctionComponent<InputProps> = ({ ...props }) => {
  return <MuiInput {...props} />;
};

export default styled(Input)(({ theme }) => ({
  color: colors.apeBlueGreenLight,
}));
