import React, { useMemo } from 'react';
import Box from '@mui/material/Box';

import { elideAddress } from '@utilities';
import { Wallet } from '@components/contexts';
import { Button, Icon } from '@components/atomic';
import CircleIcon from '@mui/icons-material/Circle';

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
      return 'Connect Wallet';
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
        <Button
          variant="dark"
          sx={{ zIndex: 1, left: (theme) => theme.spacing(-2)}}
          startIcon={<CircleIcon sx={{ width: 4, height: 4, borderRadius: 200, color: "#00d395" }} />}
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
      startIcon={<CircleIcon sx={{ width: 4, height: 4, borderRadius: 200, color: "#ff4aa9" }} />}
      onClick={onClick}
    >
      
      {text}
    </Button>
  );
};

export default WalletConnectButton;
