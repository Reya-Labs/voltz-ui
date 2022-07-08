import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { Wallet } from '@contexts';
import { Icons, Typography } from '@components/atomic';
import { WalletOptionButton } from './components';
import { WalletName } from '@contexts';

type WalletOption = {
  title: string;
  name: WalletName;
}

export type WalletSelectProps = {
  wallet: Wallet;
  onSelectWallet: (name: WalletName) => void;
};

export const walletOptions:WalletOption[] = [
  { title: 'Metamask', name: 'metamask' },
  { title: 'WalletConnect', name: 'walletConnect' }
];

const WalletSelect: React.FunctionComponent<WalletSelectProps> = ({ wallet, onSelectWallet }) => {
  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: (theme) => theme.spacing(6) }}>
        CONNECT A WALLET
      </Typography>
      {/* todo: bring back when disclaimers are ready */}
      {/* <Typography variant="body1" sx={{ marginBottom: (theme) => theme.spacing(6) }}>
        By connecting a wallet, you agree to{' '}
        <Link href="#" variant="body1" color="warning.light">
          Voltz Labs Terms of Service
        </Link>{' '}
        and acknowledge that you have read and understand the{' '}
        <Link href="#" variant="body1" color="warning.light">
          Voltz Protocol Disclaimer
        </Link>
        .
      </Typography> */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {walletOptions.map(({ title, name }) => (
          <WalletOptionButton
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

export default WalletSelect;
