import { AMM, SupportedChainId } from '@voltz-protocol/v1-sdk';

import { PoolFilters } from '../../types';

export const filterByChain = (amm: AMM, appliedFilters: PoolFilters) => {
  if (
    appliedFilters['ethereum'] &&
    (amm.chainId === SupportedChainId.mainnet || amm.chainId === SupportedChainId.goerli)
  ) {
    return true;
  }
  if (
    appliedFilters['arbitrum'] &&
    (amm.chainId === SupportedChainId.arbitrum || amm.chainId === SupportedChainId.arbitrumGoerli)
  ) {
    return true;
  }
  if (
    appliedFilters['avalanche'] &&
    (amm.chainId === SupportedChainId.avalanche || amm.chainId === SupportedChainId.avalancheFuji)
  ) {
    return true;
  }
  return false;
};
