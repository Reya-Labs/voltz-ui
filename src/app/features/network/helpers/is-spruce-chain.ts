import { SupportedChainId } from '@voltz-protocol/v1-sdk';

export const isSpruceChain = (chainId: SupportedChainId | null) =>
  chainId === SupportedChainId.spruce;
