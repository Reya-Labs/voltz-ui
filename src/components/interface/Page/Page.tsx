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
      <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0, backdropFilter: 'blur(8px)', }}>
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
          background: 'linear-gradient(270deg, rgba(25, 21, 42, 0) 0%, rgba(23, 19, 41, 0.83) 22.92%, #08070E 50.21%, rgba(23, 19, 41, 0.81) 76.81%, rgba(25, 21, 42, 0) 100%)',
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
