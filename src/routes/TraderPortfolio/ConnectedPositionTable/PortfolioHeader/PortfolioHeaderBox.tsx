import Box from '@mui/material/Box';
import React, { ReactNode } from 'react';

import { Typography } from '../../../../components/atomic/Typography/Typography';
import { colors, SystemStyleObject, Theme } from '../../../../theme';

export type PortfolioHeaderBoxProps = {
  children?: ReactNode;
  sx?: SystemStyleObject<Theme>;
  textSx?: SystemStyleObject<Theme>;
};

const valueBoxStyles: SystemStyleObject<Theme> = {
  background: colors.lavenderWeb7,
  padding: (theme) => `${theme.spacing(2)} ${theme.spacing(4)}`,
  borderRadius: '4px',
  marginTop: (theme) => theme.spacing(2),
  display: 'inline-block',
};

const valueBoxTextStyles: SystemStyleObject<Theme> = {
  color: colors.skyBlueCrayola,
  fontSize: '16px',
  lineHeight: '0.9',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
};

export const PortfolioHeaderBox = ({ children, sx, textSx }: PortfolioHeaderBoxProps) => (
  <Box sx={{ ...valueBoxStyles, ...sx }}>
    <Typography sx={{ ...valueBoxTextStyles, ...textSx }} variant="body2">
      {children}
    </Typography>
  </Box>
);
