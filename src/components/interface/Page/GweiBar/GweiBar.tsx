import React, { useEffect, useState } from 'react';

import { useWallet } from '../../../../hooks/useWallet';
import { Typography } from '../../../atomic/Typography/Typography';
import { BlockNumberTypography, CircleIcon, GweiBarBox } from './GweiBar.styled';

export const GweiBar: React.FunctionComponent = () => {
  const { provider } = useWallet();
  const [blockNumber, setBlockNumber] = useState<number>();
  const [gwei, setGwei] = useState<number>();

  const fetchDetails = React.useCallback(async () => {
    if (!provider) {
      return;
    }
    const block = await provider.getBlockNumber();
    let gasPrice = await provider.getGasPrice();
    gasPrice = gasPrice.div('1000000000');
    setBlockNumber(block);
    setGwei(gasPrice.toNumber());
  }, [provider]);

  useEffect(() => {
    void fetchDetails();
  }, [fetchDetails]);

  if (!provider || blockNumber === undefined || gwei === undefined) {
    return null;
  }

  return (
    <GweiBarBox data-testid="GweiBar-GweiBarBox">
      <Typography data-testid="GweiBar-GweiTypography" variant="body2">
        {gwei} gwei |&nbsp;
      </Typography>
      <BlockNumberTypography data-testid="GweiBar-BlockNumberTypography" variant="body2">
        <CircleIcon />
        {blockNumber}
      </BlockNumberTypography>
    </GweiBarBox>
  );
};
