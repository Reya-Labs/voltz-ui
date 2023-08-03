import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { ArbitrumIcon, AvalancheIcon, EthereumIcon } from './ChainIcon.styled';

const ChainIconMap: Record<SupportedChainId, React.FunctionComponent | null> = {
  [SupportedChainId.mainnet]: EthereumIcon,
  [SupportedChainId.goerli]: EthereumIcon,
  [SupportedChainId.arbitrum]: ArbitrumIcon,
  [SupportedChainId.arbitrumGoerli]: ArbitrumIcon,
  [SupportedChainId.avalanche]: AvalancheIcon,
  [SupportedChainId.avalancheFuji]: AvalancheIcon,
  [SupportedChainId.spruce]: AvalancheIcon,
};
export const ChainIcon: React.FunctionComponent<{
  chainId: SupportedChainId;
  hideForChains: SupportedChainId[];
}> = ({ chainId, hideForChains = [] }) => {
  const ChainIconSvg = ChainIconMap[chainId];
  if (!ChainIconSvg || hideForChains.find((h) => h === chainId)) {
    return null;
  }
  return <ChainIconSvg data-testid={`ChainIconSvg-${chainId}`} />;
};
