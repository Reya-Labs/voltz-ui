import Box from '@mui/material/Box';
import { ReactNode } from 'react';

import { SystemStyleObject, Theme } from '../../../theme';
import { Typography } from '../../atomic/Typography/Typography';

export type PortfolioHeaderValueProps = {
  children?: ReactNode;
  hint?: string;
  label: ReactNode;
};

const valueBoxLabelStyles: SystemStyleObject<Theme> = {
  fontSize: '12px',
  lineHeight: '1.2',
  textTransform: 'uppercase',
  marginLeft: '2px',
  whiteSpace: 'nowrap',
};

export const PortfolioHeaderValue = ({ children, hint, label }: PortfolioHeaderValueProps) => (
  <Box>
    <Typography sx={valueBoxLabelStyles} variant="body2">
      {label}
    </Typography>
    {children}
  </Box>
);
