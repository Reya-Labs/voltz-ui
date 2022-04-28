import React from 'react';
import Box from '@mui/material/Box';

import { Background } from '@components/atomic';
import Nav from '../Nav/Nav';
import WalletConnect from '../WalletConnect/WalletConnect';

const Page: React.FunctionComponent = ({ children }) => (
  <Background sx={{ display: 'flex', flexDirection: 'column' }}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: (theme) => `${theme.spacing(4)} ${theme.spacing(6)}`,
      }}
    >
      <Nav />
      <WalletConnect />
    </Box>
    <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: (theme) => `${theme.spacing(10)} ${theme.spacing(2)} ${theme.spacing(2)}` }}>
      {children}
    </Box>
  </Background>
);

export default Page;
