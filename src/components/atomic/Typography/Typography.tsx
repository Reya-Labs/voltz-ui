import React from 'react';
import { styled } from '@mui/system';
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

import { colors } from '@theme';

export type TypographyProps = MuiTypographyProps;

const Typography: React.FunctionComponent<TypographyProps> = ({ ...props }) => {
  return <MuiTypography {...props} />;
};

export default styled(Typography)(({ theme }) => ({
  color: colors.apeBlueGreenLight,
}));
