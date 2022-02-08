import React from 'react';
import Box from '@mui/material/Box';

import { Icon, Typography, Wallet } from '../../atomic';
import { WalletConnectModal } from './components';

export type WalletConnectProps = {
  wallet: Wallet;
};

const WalletConnect: React.FunctionComponent<WalletConnectProps> = ({ wallet }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Icon name="ethereum" color="secondary" fill="blue" />
        <Typography variant="body2" sx={{ marginLeft: (theme) => theme.spacing(2) }}>
          Ethereum
        </Typography>
      </Box>
      <WalletConnectModal wallet={wallet} />
    </Box>
  );
};

export default WalletConnect;
