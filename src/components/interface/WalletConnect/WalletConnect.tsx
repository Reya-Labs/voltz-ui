import React from 'react';
import Box from '@mui/material/Box';

import { WalletConnectModal } from './components';

const WalletConnect: React.FunctionComponent = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <WalletConnectModal />
    </Box>
  );
};

export default WalletConnect;
