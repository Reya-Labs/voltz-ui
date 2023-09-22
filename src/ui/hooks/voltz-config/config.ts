import { getVoltzPoolConfig, SupportedChainId } from '@voltz-protocol/v1-sdk';

type Config = ReturnType<typeof getVoltzPoolConfig> | null;

export const getConfig = (chainId: SupportedChainId | null): Config => {
  if (!chainId) {
    return null;
  }
  return getVoltzPoolConfig(chainId);
};
