import Box from '@mui/material/Box';
import React from 'react';

import { Nav } from '../Nav/Nav';
import { WalletConnect } from '../WalletConnect/WalletConnect';
import { AlphaBanner } from './AlphaBanner/AlphaBanner';
import { Background } from './Background/Background';
import { GweiBar } from './GweiBar/GweiBar';
import Workbench from './workbench.svg';

interface PageProps {
  children?: React.ReactNode;
}

export const Page: React.FunctionComponent<PageProps> = ({ children }: PageProps) => (
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
    <Box sx={{ position: 'fixed', bottom: '0', left: '0', width: '100%' }}>
      <GweiBar />
      <AlphaBanner />
    </Box>
  </Background>
);
