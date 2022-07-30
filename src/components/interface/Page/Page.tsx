import React from 'react';
import Box from '@mui/material/Box';

import { Background } from '@components/atomic';
import Nav from '../Nav/Nav';
import WalletConnect from '../WalletConnect/WalletConnect';

interface PageProps {
  children?: React.ReactNode;
}

const Page: React.FunctionComponent<PageProps> = ({ children }: PageProps) => (
  <Background sx={{ display: 'flex', flexDirection: 'column'}}>
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: (theme) => `${theme.spacing(4)} ${theme.spacing(6)}`,
    }}>
      <Nav />
      <WalletConnect />
    </Box>

    <Box sx={{ 
      flexGrow: 1, 
      overflowY: 'auto', 
      position: 'relative',
    }}>
      <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0, backdropFilter: 'blur(4px)', }}>
        <Box sx={{ 
          width: 'calc(50% - 720px)', 
          height: '100%', 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          background: 'rgba(12, 10, 23, 0.06)'
        }}/>
        <Box sx={{ 
          width: '100%', 
          margin: '0 auto',
          maxWidth: '1440px',
          padding: (theme) => `${theme.spacing(10)} 0 ${theme.spacing(15)}`,
          background: 'linear-gradient(270deg, rgba(12, 10, 23, 0.06) 0%, rgba(27, 23, 49, 0.95) 14.72%, #1A152F 50.21%, rgba(27, 23, 49, 0.95) 85.9%, rgba(13, 11, 24, 0.09) 100%)',
        }}>
          {children}
        </Box>
        <Box sx={{ 
          width: 'calc(50% - 720px)', 
          height: '100%', 
          position: 'absolute', 
          top: 0, 
          right: 0, 
          background: 'rgba(12, 10, 23, 0.06)'
        }}/>
      </Box>
    </Box>
  </Background>
);

export default Page;
