import { isEnvVarProvided } from './isEnvVarProvided';

/**
 * It takes a comma-separated list of network/alchemy-key pairs, and returns an array of objects with network and
 * alchemyKey properties
 * @param networkConfigurationString - This is the string that is passed in from the environment variable.
 * @returns An array of objects with network and alchemyKey properties.
 */
export const getNetworksFromProcessEnv = (
  networkConfigurationString = process.env.REACT_APP_NETWORK_SELECTOR_NETWORKS,
): {
  network: string;
  alchemyKey: string;
}[] => {
  if (!networkConfigurationString || !isEnvVarProvided(networkConfigurationString)) {
    return [];
  }

  return networkConfigurationString
    .split(',')
    .filter((s) => s.trim())
    .map((s) => ({
      network: s.split('/')[0].trim(),
      alchemyKey: s.split('/')[1].trim(),
    }))
    .filter(({ network, alchemyKey }) => network && alchemyKey);
};
