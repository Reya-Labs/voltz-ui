import Box from '@mui/material/Box';
import { SystemStyleObject, Theme } from '@mui/system';
import { ReactNode } from 'react';

import { Typography } from '../../atomic/Typography/Typography';

export type CustomPoolFieldProps = {
  children?: ReactNode;
  label: ReactNode;
};

const valueBoxLabelStyles: SystemStyleObject<Theme> = {
  fontSize: '12px',
  lineHeight: '1.4',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
};

export const CustomPoolField = ({ children, label }: CustomPoolFieldProps) => (
  <Box>
    <Typography sx={valueBoxLabelStyles} variant="body2">
      {label}
    </Typography>
    {children}
  </Box>
);
