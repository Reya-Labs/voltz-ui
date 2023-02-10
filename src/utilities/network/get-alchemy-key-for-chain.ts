import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { isEnvVarProvided } from '../isEnvVarProvided';
import { getChainsFromProcessEnv } from './get-chains-from-process-env';
type SupportedChainIds = keyof typeof SupportedChainId;

const CACHED_KEYS: Record<number, string> = {};
/**
 * It takes a chainId and returns the corresponding alchemyKey from the process.env.REACT_APP_NETWORK_SELECTOR_NETWORKS
 * variable
 * @param {SupportedChainId} chainId - The network ID of the network you want to get the Alchemy key for.
 * @param {string} processEnvKeys - This is the string that is passed in from the environment variable. String of type network1-key1,network2-key2
 * @returns The alchemy key for the network
 */
export const getAlchemyKeyForChain = (
  chainId: SupportedChainId,
  processEnvKeys = process.env.REACT_APP_NETWORK_SELECTOR_NETWORKS,
): string => {
  if (CACHED_KEYS[chainId]) {
    return CACHED_KEYS[chainId];
  }
  if (!processEnvKeys || !isEnvVarProvided(processEnvKeys)) {
    return '';
  }
  const network = getChainsFromProcessEnv(processEnvKeys).find(
    (n) => chainId === SupportedChainId[n.network as SupportedChainIds],
  );

  if (!network) {
    return '';
  }
  CACHED_KEYS[chainId] = network.alchemyKey;
  return CACHED_KEYS[chainId];
};
