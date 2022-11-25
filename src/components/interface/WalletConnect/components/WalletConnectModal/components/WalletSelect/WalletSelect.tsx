import React from 'react';
import Box from '@mui/material/Box';

import { Wallet, WalletName } from '../../../../../../../contexts';
import { Icons, Typography } from '@components/atomic';
import { WalletOptionButton } from './components';

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
