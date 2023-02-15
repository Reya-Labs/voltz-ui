import { getVoltzPoolConfigV1, SupportedChainId } from '@voltz-protocol/v1-sdk';

type Config = ReturnType<typeof getVoltzPoolConfigV1> | null;
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
  cachedConfig[chainId] = getVoltzPoolConfigV1(chainId);
  return cachedConfig[chainId];
};
