import { getVoltzPoolConfig, SupportedChainId } from '@voltz-protocol/v1-sdk';

type Config = ReturnType<typeof getVoltzPoolConfig> | null;
const cachedConfig: Record<SupportedChainId, Config> = {
  [SupportedChainId.mainnet]: null,
  [SupportedChainId.goerli]: null,
  [SupportedChainId.arbitrum]: null,
  [SupportedChainId.arbitrumGoerli]: null,
};

export const getConfig = (chainId: SupportedChainId | null): Config => {
  if (!chainId) {
    return null;
  }
  if (cachedConfig[chainId]) {
    return cachedConfig[chainId];
  }
  cachedConfig[chainId] = getVoltzPoolConfig(chainId);
  return cachedConfig[chainId];
};
