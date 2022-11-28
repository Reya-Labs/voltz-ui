import React from 'react';
import Box from '@mui/material/Box';
import isNull from 'lodash/isNull';

import { Wallet } from '../../../../../../../contexts/WalletContext/types';
import { Typography } from '../../../../../../atomic/Typography/Typography';
import { Button } from '../../../../../../atomic/Button/Button';
import { Icon } from '../../../../../../atomic/Icon/Icon';
import { Panel } from '../../../../../../atomic/Panel/Panel';

export type WalletDisplayProps = {
  wallet: Wallet;
  onChangeWallet: () => void;
};

export const WalletDisplay: React.FunctionComponent<WalletDisplayProps> = ({
  wallet,
  onChangeWallet,
}) => {
  if (isNull(wallet.name) || wallet.name === 'disconnect') {
    return null;
  }

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: (theme) => theme.spacing(6) }}>
        ACCOUNT
      </Typography>
      <Panel variant="dark" sx={{ display: 'flex', flexDirection: 'column' }}>
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
          <Icon name="information-circle" color="info" sx={{ position: 'relative', top: '-2px' }} />
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Button
              variant="text"
              color="error"
              sx={{ marginLeft: (theme) => theme.spacing(1), fontSize: 18, top: '-2px' }}
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
