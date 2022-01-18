import React from 'react';
import { styled } from '@mui/system';
import MuiInput, { InputProps as MuiInputProps } from '@mui/material/Input';

import { colors } from '@theme';

export type IntegerInputProps = MuiInputProps;

const IntegerInput: React.FunctionComponent<IntegerInputProps> = ({ ...props }) => {
  return <MuiInput {...props} />;
};

export default styled(IntegerInput)(({ theme }) => ({
  color: colors.apeBlueGreenLight,
}));
