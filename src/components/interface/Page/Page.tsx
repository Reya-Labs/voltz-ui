import Box from '@mui/material/Box';
import React from 'react';

import { NetworkSelector } from '../NetworkSelector/NetworkSelector';
import { WalletConnectModal } from '../WalletConnectModal/WalletConnectModal';
import { AlphaBanner } from './AlphaBanner/AlphaBanner';
import { Background } from './Background/Background';
import { GweiBar } from './GweiBar/GweiBar';
import { Nav } from './Nav/Nav';
import Workbench from './workbench.svg';

export type PageProps = {
  children: React.ReactNode;
};

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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginLeft: '16px',
        }}
      >
        <NetworkSelector />
        <WalletConnectModal useNewUI={false} />
      </Box>
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
