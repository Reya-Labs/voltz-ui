import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';

import { isEnvVarProvided } from './isEnvVarProvided';
type SupportedNetworkKeys = keyof typeof SupportedNetworksEnum;

/**
 * It takes a networkId and returns the corresponding Alchemy API key
 * @param {SupportedNetworksEnum} networkId - The network ID of the network you want to get the API key for.
 * @returns A function that takes a networkId and returns a string.
 */
export const getAlchemyKeyForNetwork = (networkId: SupportedNetworksEnum): string => {
  // should be string of type network1-key1,network2-key2
  const keys = process.env.REACT_APP_NETWORK_ALCHEMY_KEYS;
  if (!keys || !isEnvVarProvided(keys)) {
    return '';
  }

  const alchemyNetworkKeyMap: Record<SupportedNetworksEnum, string> = keys
    .split(',')
    .map((k) => k.trim())
    .reduce((pV, cI) => {
      const [network, apiKey] = cI.split('/');
      return {
        ...pV,
        [SupportedNetworksEnum[network as SupportedNetworkKeys]]: apiKey,
      };
    }, {} as Record<SupportedNetworksEnum, string>);

  return alchemyNetworkKeyMap[networkId];
};
