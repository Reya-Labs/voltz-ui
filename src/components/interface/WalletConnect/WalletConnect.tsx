import React from 'react';
import Box from '@mui/material/Box';

import { Icon, Typography } from '../../atomic';
import { WalletConnectModal } from './components';

export type WalletConnectProps = {};

const WalletConnect: React.FunctionComponent<WalletConnectProps> = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Icon name="ethereum" color="primary" />
        <Typography variant="body2">Ethereum</Typography>
      </Box>
      <WalletConnectModal />
    </Box>
  );
};

export default WalletConnect;
