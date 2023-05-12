import { detectNetworkWithChainId, SupportedChainId } from '@voltz-protocol/v1-sdk';

import { getChainsFromProcessEnv } from './get-chains-from-process-env';
type SupportedChainIds = keyof typeof SupportedChainId;

/**
 * If the chainId is supported and the network is in the networkConfigurationString, return true and the network, otherwise
 * return false and null.
 * @param {number} chainId - The chainId of the network you're trying to detect.
 * @param {string} networkConfigurationString - This is the string that is passed in from the environment variable. String of type network1-key1,network2-key2
 */
export const detectIfNetworkSupported = (
  chainId: number,
  networkConfigurationString = process.env.REACT_APP_NETWORK_SELECTOR_NETWORKS,
): {
  chainId: SupportedChainId | null;
  isSupported: boolean;
} => {
  const networkValidation = detectNetworkWithChainId(chainId);
  if (
    networkValidation.isSupported &&
    getChainsFromProcessEnv(networkConfigurationString).find(
      (n) => SupportedChainId[n.network as SupportedChainIds] === chainId,
    )
  ) {
    return {
      isSupported: true,
      chainId: networkValidation.chainId,
    };
  }
  return {
    isSupported: false,
    chainId: null,
  };
};
