import { ReactNode } from 'react';
import { Typography } from '@components/atomic';
import Box from '@mui/material/Box';
import { SystemStyleObject, Theme } from '@theme';

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

const PortfolioHeaderValue = ({ children, hint, label }: PortfolioHeaderValueProps) => (
  <Box>
    <Typography variant="body2" sx={valueBoxLabelStyles}>
      {label}
    </Typography>
    {children}
  </Box>
);

export default PortfolioHeaderValue;
