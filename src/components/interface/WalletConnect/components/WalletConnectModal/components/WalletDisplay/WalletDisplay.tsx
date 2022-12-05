import Box from '@mui/material/Box';
import React from 'react';

import { Wallet } from '../../../../../../../contexts/WalletContext/types';
import { Button } from '../../../../../../atomic/Button/Button';
import { Icon } from '../../../../../../atomic/Icon/Icon';
import { Panel } from '../../../../../../atomic/Panel/Panel';
import { Typography } from '../../../../../../atomic/Typography/Typography';

export type WalletDisplayProps = {
  wallet: Wallet;
  onChangeWallet: () => void;
};

export const WalletDisplay: React.FunctionComponent<WalletDisplayProps> = ({
  wallet,
  onChangeWallet,
}) => {
  if (!wallet.name || wallet.name === 'disconnect') {
    return null;
  }

  return (
    <>
      <Typography sx={{ marginBottom: (theme) => theme.spacing(6) }} variant="h6">
        ACCOUNT
      </Typography>
      <Panel sx={{ display: 'flex', flexDirection: 'column' }} variant="dark">
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
          <Icon color="info" name="information-circle" sx={{ position: 'relative', top: '-2px' }} />
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Button
              color="error"
              sx={{ marginLeft: (theme) => theme.spacing(1), fontSize: 18, top: '-2px' }}
              variant="text"
              onClick={onChangeWallet}
            >
              CHANGE WALLET
            </Button>
          </Box>
        </Box>
      </Panel>
    </>
  );
};
