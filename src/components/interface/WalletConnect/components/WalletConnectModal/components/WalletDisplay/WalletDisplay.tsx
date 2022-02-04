import React from 'react';
import Box from '@mui/material/Box';
import isNull from 'lodash/isNull';

import { Wallet } from '@hooks';
import { Button, Icon, Panel, Typography } from '@components/atomic';

export type WalletDisplayProps = {
  wallet: Wallet;
  onChangeWallet: () => void;
};

const WalletDisplay: React.FunctionComponent<WalletDisplayProps> = ({ wallet, onChangeWallet }) => {
  if (isNull(wallet.name)) {
    return null;
  }

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: (theme) => theme.spacing(6) }}>
        ACCOUNT
      </Typography>
      <Panel
        variant="dark"
        sx={{ padding: (theme) => theme.spacing(6), display: 'flex', flexDirection: 'column' }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Typography variant="h2">CONNECTED WITH {wallet.name.toUpperCase()}</Typography>
          <Icon
            name={wallet.name}
            sx={{ marginLeft: (theme) => theme.spacing(4), paddingTop: 1 }}
          />
        </Box>
        <Box
          sx={{
            marginTop: (theme) => theme.spacing(8),
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Icon
            name="information-circle"
            color="error"
            sx={{ position: 'relative', top: '-2px' }}
          />
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Typography
              variant="body1"
              sx={{ marginLeft: (theme) => theme.spacing(4), fontWeight: 'bold' }}
            >
              ADDRESS
            </Typography>
            <Button
              variant="text"
              color="error"
              sx={{ marginLeft: (theme) => theme.spacing(4) }}
              onClick={onChangeWallet}
            >
              CHANGE
            </Button>
          </Box>
        </Box>
        <Box>
          <Button variant="text" startIcon={<Icon name="information-circle" />} color="secondary">
            Copy address
          </Button>
          <Button variant="text" startIcon={<Icon name="information-circle" />} color="secondary">
            View in explorer
          </Button>
        </Box>
        <Panel
          variant="main"
          sx={{ padding: (theme) => theme.spacing(1), display: 'flex', flexDirection: 'column' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ marginLeft: (theme) => theme.spacing(4) }}>
              RECENT TRANSACTIONS
            </Typography>
            <Button variant="text" color="error" sx={{ marginLeft: (theme) => theme.spacing(4) }}>
              CLEAR
            </Button>
          </Box>
        </Panel>
      </Panel>
    </>
  );
};

export default WalletDisplay;
