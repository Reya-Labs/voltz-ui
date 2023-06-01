import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { ArbitrumIcon, AvalancheIcon } from './ChainIcon.styled';

const ChainIconMap: Record<SupportedChainId, React.FunctionComponent | null> = {
  [SupportedChainId.mainnet]: null,
  [SupportedChainId.goerli]: null,
  [SupportedChainId.arbitrum]: ArbitrumIcon,
  [SupportedChainId.arbitrumGoerli]: ArbitrumIcon,
  [SupportedChainId.avalanche]: AvalancheIcon,
  [SupportedChainId.avalancheFuji]: AvalancheIcon,
};
export const ChainIcon = ({ chainId }: { chainId: SupportedChainId }) => {
  const ChainIconSvg = ChainIconMap[chainId];
  if (!ChainIconSvg) {
    return null;
  }
  return <ChainIconSvg />;
};
