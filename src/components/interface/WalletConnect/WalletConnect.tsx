import React from 'react';
import Box from '@mui/material/Box';

import { Icon, Typography } from '../../atomic';
import { WalletConnectModal } from './components';

const WalletConnect: React.FunctionComponent = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Icon name="ethereum" color="secondary" fill="blue" />
        <Typography variant="body2" sx={{ marginLeft: (theme) => theme.spacing(2) }}>
          Ethereum
        </Typography>
      </Box>
      <WalletConnectModal />
    </Box>
  );
};

export default WalletConnect;
