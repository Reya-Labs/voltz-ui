import Box from '@mui/material/Box';
import isUndefined from 'lodash.isundefined';
import React, { useEffect, useState } from 'react';

import { useWallet } from '../../../../hooks/useWallet';
import { colors } from '../../../../theme';
import { Typography } from '../../../atomic/Typography/Typography';
import { BulletLabel } from '../../../composite/BulletLabel/BulletLabel';

export type GweiBarProps = {};

export const GweiBar: React.FunctionComponent<GweiBarProps> = () => {
  const { provider } = useWallet();
  const [blockNumber, setBlockNumber] = useState<number>();
  const [gwei, setGwei] = useState<number>();

  const fetchDetails = React.useCallback(async () => {
    if (!provider) {
      return;
    }
    const block = await provider.getBlockNumber();
    const gasPrice = await provider.getGasPrice();
    setBlockNumber(block);
    setGwei(gasPrice.toNumber());
  }, [provider]);

  useEffect(() => {
    void fetchDetails();
  }, [fetchDetails]);

  if (!provider || isUndefined(blockNumber) || isUndefined(gwei)) {
    return null;
  }

  return (
    <Box
      sx={{
        height: '12px',
        width: '100%',
        padding: (theme) => theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography variant="body2">{gwei} gwei</Typography>
      <Box
        sx={{
          height: '100%',
          width: '1px',
          background: colors.lavenderWeb,
          margin: (theme) => `0 ${theme.spacing(4)}`,
        }}
      />
      <BulletLabel sx={{ color: colors.skyBlueCrayola }} text={blockNumber} />
    </Box>
  );
};
