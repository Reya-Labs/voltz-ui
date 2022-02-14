import React from 'react';
import Box from '@mui/material/Box';

import { Background } from '@components/atomic';
import { useWallet } from '@hooks';
import Nav from '../Nav/Nav';
import WalletConnect from '../WalletConnect/WalletConnect';

const Page: React.FunctionComponent = ({ children }) => {
  const wallet = useWallet();

  return (
    <Background sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: (theme) => theme.spacing(4),
        }}
      >
        <Nav />
        <WalletConnect wallet={wallet} />
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: 'scroll' }}>{children}</Box>
    </Background>
  );
};

export default Page;
