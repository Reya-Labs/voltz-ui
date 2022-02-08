import React, { useMemo } from 'react';
import Box from '@mui/material/Box';

import { Wallet } from '@components/atomic';
import { Button, Icon } from '@components/atomic';

export type WalletConnectButtonProps = {
  onClick?: () => void;
  wallet: Wallet;
};

const WalletConnectButton: React.FunctionComponent<WalletConnectButtonProps> = ({
  onClick,
  wallet: { status, name },
}) => {
  const balance = 1000;
  const currency = 'ETH';
  const text = useMemo(() => {
    if (status === 'connected') {
      return `${balance} ${currency}`;
    }

    return 'Connect wallet';
  }, [status]);

  if (status === 'connected') {
    return (
      <Box sx={{ marginLeft: (theme) => theme.spacing(4), display: 'flex' }}>
        <Button variant="darker" onClick={onClick}>
          {text}
        </Button>
        <Button
          variant="dark"
          sx={{ zIndex: 1, left: (theme) => theme.spacing(-2) }}
          startIcon={<Icon name="warning-circle" />}
          endIcon={name && <Icon name={name} />}
          onClick={onClick}
        >
          ADDRESS
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
