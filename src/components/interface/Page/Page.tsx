import React from 'react';
import Box from '@mui/material/Box';

import { Background } from '@components/atomic';
import Nav from '../Nav/Nav';
import WalletConnect from '../WalletConnect/WalletConnect';
import Workbench from './workbench.svg';

interface PageProps {
  children?: React.ReactNode;
}

const Page: React.FunctionComponent<PageProps> = ({ children }: PageProps) => (
  <Background>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: (theme) => theme.spacing(2.5, 5),
      }}
    >
      <Nav />
      <WalletConnect />
    </Box>

    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        position: 'relative',
        backgroundImage: `url(${Workbench})`,
        backgroundSize: 'cover',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          padding: (theme) => `${theme.spacing(10)} 0 ${theme.spacing(15)}`,
        }}
      >
        {children}
      </Box>
    </Box>
  </Background>
);

export default Page;
