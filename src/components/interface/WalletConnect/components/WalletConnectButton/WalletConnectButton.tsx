import React, { useMemo } from 'react';
import Box from '@mui/material/Box';

import { Wallet } from '../../../../../contexts/WalletContext/types';
import CircleIcon from '@mui/icons-material/Circle';

import { colors } from '../../../../../theme';
import { AvatarAddress } from '../../../AvatarAddress/AvatarAddress';
import { Button } from '../../../../atomic/Button/Button';
import { Icon } from '../../../../atomic/Icon/Icon';
import { Icons } from '../../../../atomic/Icon/types';

export type WalletConnectButtonProps = {
  onClick?: () => void;
  wallet: Wallet;
};

export const WalletConnectButton: React.FunctionComponent<WalletConnectButtonProps> = ({
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
          endIcon={name && <Icon name={name as Icons} sx={{ width: 16 }} />}
          onClick={onClick}
        >
          <AvatarAddress
            address={account}
            size={16}
            nameSx={{
              fontSize: '16px',
              lineHeight: '14px',
            }}
          />
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
