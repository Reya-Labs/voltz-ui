import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { styled } from '@mui/system';

import { colors } from '@theme';

export type ButtonProps = MuiButtonProps;

const Button: React.FunctionComponent<ButtonProps> = ({ ...props }) => {
  return <MuiButton {...props} />;
};

export default styled(Button)(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: colors.vzBlueGreenDark,
  color: colors.vzBlueGreenLight,
}));
