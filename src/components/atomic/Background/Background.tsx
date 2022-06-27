import React from 'react';
import { SystemStyleObject, Theme } from '@mui/system';
import Box from '@mui/material/Box';

export type BackgroundProps = {
  sx?: SystemStyleObject<Theme>;
};


const Background: React.FunctionComponent<BackgroundProps> = ({ children, sx }) => (
  <Box
    sx={{
      background: 'radial-gradient(86.39% 190.57% at 49.31% 50%, #000000 0%, #312859 100%)',
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      boxSizing: 'border-box',
      ...sx,
    }}
  >
    {children}
  </Box>
);

export default Background;
