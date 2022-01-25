import React from 'react';
import Box from '@mui/material/Box';

const Background: React.FunctionComponent = ({ children }) => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      padding: (theme) => theme.spacing(2),
    }}
  >
    {children}
  </Box>
);

export default Background;
