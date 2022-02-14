import React, { useMemo } from 'react';
import Box from '@mui/material/Box';

import { elideAddress } from '@utilities';
import { Wallet } from '@components/contexts';
import { Button, Icon } from '@components/atomic';

export type WalletConnectButtonProps = {
  onClick?: () => void;
  wallet: Wallet;
};

const WalletConnectButton: React.FunctionComponent<WalletConnectButtonProps> = ({
  onClick,
  wallet: { status, name, account, balance },
}) => {
  const currency = 'ETH';
  const text = useMemo(() => {
    if (!balance) {
      return 'No balance';
    }

    if (status === 'connected') {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `${balance} ${currency}`;
    }

    return 'Connect wallet';
  }, [balance, status]);

  if (status === 'connected') {
    return (
      <Box sx={{ marginLeft: (theme) => theme.spacing(4), display: 'flex' }}>
        <Button variant="darker" onClick={onClick} sx={{ pointerEvents: 'none' }}>
          {text}
        </Button>
        <Button
          variant="dark"
          sx={{ zIndex: 1, left: (theme) => theme.spacing(-2) }}
          startIcon={<Icon name="warning-circle" />}
          endIcon={name && <Icon name={name} />}
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
      sx={{ marginLeft: (theme) => theme.spacing(4) }}
      onClick={onClick}
      startIcon={<Icon name="warning-circle" />}
    >
      {text}
    </Button>
  );
};

export default WalletConnectButton;
