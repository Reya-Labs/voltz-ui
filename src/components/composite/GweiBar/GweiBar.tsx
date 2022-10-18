import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useWallet } from '@hooks';
import { isUndefined } from 'lodash';
import { Typography } from '@components/atomic';
import { BulletLabel } from '@components/composite';
import { colors } from '@theme';

export type GweiBarProps = {};

export const GweiBar: React.FunctionComponent<GweiBarProps> = () => {
  const { provider } = useWallet();
  const [blockNumber, setBlockNumber] = useState<number>();
  const [gwei, setGwei] = useState<number>();

  useEffect(() => {
    if (provider) {
      Promise.allSettled([provider.getBlockNumber(), provider.getGasPrice()]).then((resps) => {
        if (resps[0].status === 'fulfilled') {
          setBlockNumber(resps[0].value);
        }
        if (resps[1].status === 'fulfilled') {
          setGwei(resps[1].value.toNumber());
        }
      });
    }
  }, [provider]);

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
          background: colors.lavenderWeb.base,
          margin: (theme) => `0 ${theme.spacing(4)}`,
        }}
      />
      <BulletLabel sx={{ color: colors.vzCustomGreen2.base }} text={blockNumber} />
    </Box>
  );
};

export default GweiBar;
