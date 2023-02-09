import { getVoltzPoolConfigV1, SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';

type Config = ReturnType<typeof getVoltzPoolConfigV1> | null;
const cachedConfig: Record<SupportedNetworksEnum, Config> = {
  [SupportedNetworksEnum.mainnet]: null,
  [SupportedNetworksEnum.goerli]: null,
  [SupportedNetworksEnum.arbitrum]: null,
  [SupportedNetworksEnum.arbitrumGoerli]: null,
};

export const getConfig = (network: SupportedNetworksEnum): Config => {
  if (cachedConfig[network]) {
    return cachedConfig[network];
  }
  cachedConfig[network] = getVoltzPoolConfigV1();
  return cachedConfig[network];
};
