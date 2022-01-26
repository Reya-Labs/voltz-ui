import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import Box from '@mui/material/Box';

export type BackgroundProps = {
  sx?: SystemStyleObject<Theme>;
};

const Background: React.FunctionComponent<BackgroundProps> = ({ children, sx }) => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      padding: (theme) => theme.spacing(2),
      boxSizing: 'border-box',
      ...sx,
    }}
  >
    {children}
  </Box>
);

export default Background;
