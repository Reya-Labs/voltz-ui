import React from 'react';
import Box from '@mui/material/Box';

import { WalletConnectModal } from './components';

// todo: FB do we really need this component?
export const WalletConnect: React.FunctionComponent = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <WalletConnectModal />
    </Box>
  );
};
