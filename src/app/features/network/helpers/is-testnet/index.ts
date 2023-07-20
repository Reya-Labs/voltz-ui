import { SupportedChainId } from '@voltz-protocol/v1-sdk';

const TestNetMap: Record<SupportedChainId, boolean> = {
  [SupportedChainId.mainnet]: false,
  [SupportedChainId.goerli]: true,
  [SupportedChainId.arbitrum]: false,
  [SupportedChainId.arbitrumGoerli]: true,
  [SupportedChainId.avalanche]: false,
  [SupportedChainId.avalancheFuji]: true,
  [SupportedChainId.spruce]: false,
};

export const isTestnet = (chainId: SupportedChainId) => Boolean(TestNetMap[chainId]);
