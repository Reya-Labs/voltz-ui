import { SupportedChainId } from '@voltz-protocol/v1-sdk';

export const isArbitrumChain = (chainId: SupportedChainId | null) =>
  chainId === SupportedChainId.arbitrum || chainId === SupportedChainId.arbitrumGoerli;
