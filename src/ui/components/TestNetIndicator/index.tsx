import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { Pill } from 'brokoli-ui';
import React from 'react';

const TestNetMap: Record<SupportedChainId, boolean> = {
  [SupportedChainId.mainnet]: false,
  [SupportedChainId.goerli]: true,
  [SupportedChainId.arbitrum]: false,
  [SupportedChainId.arbitrumGoerli]: true,
  [SupportedChainId.avalanche]: false,
  [SupportedChainId.avalancheFuji]: true,
  [SupportedChainId.spruce]: false,
};
export const TestNetIndicator: React.FunctionComponent<{ chainId: SupportedChainId }> = ({
  chainId,
}) => {
  const isTestNet = TestNetMap[chainId];
  if (!isTestNet) {
    return null;
  }
  return (
    <Pill colorToken="skyBlueCrayola" typographyToken="primaryBodySmallRegular" variant="compact">
      Testnet
    </Pill>
  );
};
