import React, { ReactNode } from 'react';
import { colors, SystemStyleObject, Theme } from '@theme';
import { Typography } from '@components/atomic';
import Box from '@mui/material/Box';

export type PortfolioHeaderBoxProps = {
  children?: ReactNode;
  sx?: SystemStyleObject<Theme>;
  textSx?: SystemStyleObject<Theme>;
};

const valueBoxStyles: SystemStyleObject<Theme> = { 
  background: colors.lavenderWeb.darken040,
  padding: (theme) => `${theme.spacing(2)} ${theme.spacing(4)}`,
  borderRadius: '4px',
  marginTop: (theme) => theme.spacing(2),
  display: 'inline-block'
};

const valueBoxTextStyles: SystemStyleObject<Theme> = { 
  color: colors.skyBlueCrayola.base,
  fontSize: '16px', 
  lineHeight: '0.9',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap'
};

const PortfolioHeaderBox = ({ children, sx, textSx }: PortfolioHeaderBoxProps) => (
  <Box sx={{ ...valueBoxStyles, ...sx }}>
    <Typography variant='body2' sx={{ ...valueBoxTextStyles, ...textSx }}>
      {children}
    </Typography>
  </Box>
);

export default PortfolioHeaderBox;

  