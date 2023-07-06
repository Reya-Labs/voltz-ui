import { SupportedChainId } from '@voltz-protocol/v1-sdk';

export const isAvalancheChain = (chainId: SupportedChainId | null) =>
  chainId === SupportedChainId.avalanche || chainId === SupportedChainId.avalancheFuji;
