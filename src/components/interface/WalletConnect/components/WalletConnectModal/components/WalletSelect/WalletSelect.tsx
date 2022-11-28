import React from 'react';
import Box from '@mui/material/Box';

import { Icons } from '../../../../../../atomic/Icon/types';
import { WalletOptionButton } from './components';
import { Typography } from '../../../../../../atomic/Typography/Typography';
import { Wallet, WalletName } from '../../../../../../../contexts/WalletContext/types';

type WalletOption = {
  title: string;
  name: WalletName;
};

export type WalletSelectProps = {
  wallet: Wallet;
  onSelectWallet: (name: WalletName) => void;
};

export const walletOptions: WalletOption[] = [
  { title: 'Metamask', name: 'metamask' },
  { title: 'WalletConnect', name: 'walletConnect' },
  { title: 'Disconnect', name: 'disconnect' },
];

export const WalletSelect: React.FunctionComponent<WalletSelectProps> = ({
  wallet,
  onSelectWallet,
}) => {
  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: (theme) => theme.spacing(6) }}>
        CONNECT A WALLET
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {walletOptions.map(({ title, name }) => (
          <WalletOptionButton
            key={title}
            title={title}
            icon={name as Icons}
            onClick={() => onSelectWallet(name)}
            selected={name === wallet.name && wallet.status === 'connected'}
          />
        ))}
      </Box>
      <Typography
        variant="h2"
        sx={{ marginTop: (theme) => theme.spacing(22), textAlign: 'center' }}
      >
        MORE OPTIONS COMING SOON
      </Typography>
    </>
  );
};
