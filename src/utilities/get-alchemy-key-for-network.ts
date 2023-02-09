import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';

import { getNetworksFromProcessEnv } from './get-networks-from-process-env';
import { isEnvVarProvided } from './isEnvVarProvided';
type SupportedNetworkKeys = keyof typeof SupportedNetworksEnum;

/**
 * It takes a networkId and returns the corresponding alchemyKey from the process.env.REACT_APP_NETWORK_SELECTOR_NETWORKS
 * variable
 * @param {SupportedNetworksEnum} networkId - The network ID of the network you want to get the Alchemy key for.
 * @returns The alchemy key for the network
 */
export const getAlchemyKeyForNetwork = (networkId: SupportedNetworksEnum): string => {
  // should be string of type network1-key1,network2-key2
  const keys = process.env.REACT_APP_NETWORK_SELECTOR_NETWORKS;
  if (!keys || !isEnvVarProvided(keys)) {
    return '';
  }
  const network = getNetworksFromProcessEnv().find(
    (n) => networkId === SupportedNetworksEnum[n.network as SupportedNetworkKeys],
  );

  if (!network) {
    return '';
  }

  return network.alchemyKey;
};
