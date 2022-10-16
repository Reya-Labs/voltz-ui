import React, { useMemo } from 'react';
import Box from '@mui/material/Box';

import { elideAddress } from '@utilities';
import { Wallet } from '@contexts';
import { Button, Icon } from '@components/atomic';
import CircleIcon from '@mui/icons-material/Circle';

import './web3modal.scss';
import { Icons } from '@components/atomic';
import { colors } from '@theme';

export type WalletConnectButtonProps = {
  onClick?: () => void;
  wallet: Wallet;
};

const WalletConnectButton: React.FunctionComponent<WalletConnectButtonProps> = ({
  onClick,
  wallet: { status, name, account, balance, walletError },
}) => {
  const currency = 'ETH';
  const text = useMemo(() => {
    if (!balance) {
      return 'Connect Wallet';
    }

    if (status === 'connected') {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `${balance} ${currency}`;
    }

    return 'Connect wallet';
  }, [balance, status]);

  if (walletError) {
    return (
      <Box sx={{ marginLeft: (theme) => theme.spacing(4), display: 'flex' }}>
        <Button
          variant="red"
          sx={{ zIndex: 1, left: (theme) => theme.spacing(-2), fontSize: 16 }}
          startIcon={
            <CircleIcon
              sx={{ width: 4, height: 4, borderRadius: 200, color: colors.wildStrawberry.base }}
            />
          }
          onClick={onClick}
        >
          {walletError}
        </Button>
      </Box>
    );
  }

  if (status === 'connected') {
    return (
      <Box sx={{ marginLeft: (theme) => theme.spacing(4), display: 'flex' }}>
        <Button
          variant="dark"
          sx={{ zIndex: 1, left: (theme) => theme.spacing(-2), fontSize: 16 }}
          startIcon={
            <CircleIcon
              sx={{ width: 4, height: 4, borderRadius: 200, color: colors.vzCustomGreen2.base }}
            />
          }
          endIcon={name && <Icon name={name as Icons} sx={{ width: 16 }} />}
          onClick={onClick}
        >
          {account && elideAddress(account)}
        </Button>
      </Box>
    );
  }

  return (
    <Button
      variant="darker"
      sx={{ marginLeft: (theme) => theme.spacing(4), fontSize: 16 }}
      startIcon={
        <CircleIcon
          sx={{ width: 4, height: 4, borderRadius: 200, color: colors.wildStrawberry.base }}
        />
      }
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default WalletConnectButton;
