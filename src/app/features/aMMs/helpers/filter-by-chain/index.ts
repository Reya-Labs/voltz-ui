import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { PoolFilters } from '../../types';

export const filterByChain = (chainId: SupportedChainId, appliedFilters: PoolFilters) => {
  if (
    appliedFilters['ethereum'] &&
    (chainId === SupportedChainId.mainnet || chainId === SupportedChainId.goerli)
  ) {
    return true;
  }
  if (
    appliedFilters['arbitrum'] &&
    (chainId === SupportedChainId.arbitrum || chainId === SupportedChainId.arbitrumGoerli)
  ) {
    return true;
  }
  if (
    appliedFilters['avalanche'] &&
    (chainId === SupportedChainId.avalanche || chainId === SupportedChainId.avalancheFuji)
  ) {
    return true;
  }
  return false;
};
