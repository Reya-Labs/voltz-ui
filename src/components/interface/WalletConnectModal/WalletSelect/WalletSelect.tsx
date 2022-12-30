import Box from '@mui/material/Box';
import React from 'react';

import { Wallet, WalletName } from '../../../../contexts/WalletContext/types';
import { SupportedIcons } from '../../../atomic/Icon/types';
import { Typography } from '../../../atomic/Typography/Typography';
import { WalletOptionButton } from './WalletOptionButton/WalletOptionButton';

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
      <Typography sx={{ marginBottom: (theme) => theme.spacing(6) }} variant="h6">
        CONNECT A WALLET
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {walletOptions.map(({ title, name }) => (
          <WalletOptionButton
            key={title}
            icon={name as SupportedIcons}
            selected={name === wallet.name && wallet.status === 'connected'}
            title={title}
            onClick={() => onSelectWallet(name)}
          />
        ))}
      </Box>
      <Typography
        sx={{ marginTop: (theme) => theme.spacing(22), textAlign: 'center' }}
        variant="h2"
      >
        MORE OPTIONS COMING SOON
      </Typography>
    </>
  );
};
