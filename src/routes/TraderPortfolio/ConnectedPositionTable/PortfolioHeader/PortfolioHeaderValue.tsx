import Box from '@mui/material/Box';
import { ReactNode } from 'react';

import { Typography } from '../../../../components/atomic/Typography/Typography';
import { SystemStyleObject, Theme } from '../../../../theme';

export type PortfolioHeaderValueProps = {
  children?: ReactNode;
  label: ReactNode;
};

const valueBoxLabelStyles: SystemStyleObject<Theme> = {
  fontSize: '12px',
  lineHeight: '1.2',
  textTransform: 'uppercase',
  marginLeft: '2px',
  whiteSpace: 'nowrap',
};

export const PortfolioHeaderValue = ({ children, label }: PortfolioHeaderValueProps) => (
  <Box>
    <Typography sx={valueBoxLabelStyles} variant="body2">
      {label}
    </Typography>
    {children}
  </Box>
);
