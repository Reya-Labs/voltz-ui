import { isEnvVarProvided } from '../isEnvVarProvided';

type NetworkConfigFromProcessENV = {
  network: string;
  alchemyKey: string;
};
const cachedNetworkConfigs: Record<string, NetworkConfigFromProcessENV[] | undefined> = {};
/**
 * It takes a comma-separated list of network/alchemy-key pairs, and returns an array of objects with network and
 * alchemyKey properties
 * @param {string} networkConfigurationString - This is the string that is passed in from the environment variable. String of type network1-key1,network2-key2
 * @returns An array of objects with network and alchemyKey properties.
 */
export const getChainsFromProcessEnv = (
  networkConfigurationString = process.env.REACT_APP_NETWORK_SELECTOR_NETWORKS,
): {
  network: string;
  alchemyKey: string;
}[] => {
  if (!networkConfigurationString || !isEnvVarProvided(networkConfigurationString)) {
    return [];
  }
  if (cachedNetworkConfigs[networkConfigurationString]) {
    return cachedNetworkConfigs[networkConfigurationString]!;
  }

  cachedNetworkConfigs[networkConfigurationString] = networkConfigurationString
    .split(',')
    .filter((s) => s.trim())
    .map((s) => ({
      network: s.split('/')[0].trim(),
      alchemyKey: s.split('/')[1].trim(),
    }))
    .filter(({ network, alchemyKey }) => network && alchemyKey);

  return cachedNetworkConfigs[networkConfigurationString]!;
};
