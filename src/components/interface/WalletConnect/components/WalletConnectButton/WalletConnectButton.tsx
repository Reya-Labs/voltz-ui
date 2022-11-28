import CircleIcon from '@mui/icons-material/Circle';
import Box from '@mui/material/Box';
import React, { useMemo } from 'react';

import { Wallet } from '../../../../../contexts/WalletContext/types';
import { colors } from '../../../../../theme';
import { Button } from '../../../../atomic/Button/Button';
import { Icon } from '../../../../atomic/Icon/Icon';
import { Icons } from '../../../../atomic/Icon/types';
import { AvatarAddress } from '../../../AvatarAddress/AvatarAddress';

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
          startIcon={
            <CircleIcon
              sx={{ width: 4, height: 4, borderRadius: 200, color: colors.wildStrawberry.base }}
            />
          }
          sx={{ zIndex: 1, left: (theme) => theme.spacing(-2), fontSize: 16 }}
          variant="red"
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
          endIcon={name && <Icon name={name as Icons} sx={{ width: 16 }} />}
          sx={{ zIndex: 1, left: (theme) => theme.spacing(-2), fontSize: 16 }}
          variant="dark"
          onClick={onClick}
        >
          <AvatarAddress
            address={account}
            nameSx={{
              fontSize: '16px',
              lineHeight: '14px',
            }}
            size={16}
          />
        </Button>
      </Box>
    );
  }

  return (
    <Button
      startIcon={
        <CircleIcon
          sx={{ width: 4, height: 4, borderRadius: 200, color: colors.wildStrawberry.base }}
        />
      }
      sx={{ marginLeft: (theme) => theme.spacing(4), fontSize: 16 }}
      variant="darker"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
