import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { Pill } from 'brokoli-ui';
import React from 'react';

import { isTestnet } from '../../../app/features/network';

export const TestNetIndicator: React.FunctionComponent<{ chainId: SupportedChainId }> = ({
  chainId,
}) => {
  const isTestNet = isTestnet(chainId);
  if (!isTestNet) {
    return null;
  }
  return (
    <Pill colorToken="skyBlueCrayola" typographyToken="primaryBodySmallRegular" variant="compact">
      Testnet
    </Pill>
  );
};
