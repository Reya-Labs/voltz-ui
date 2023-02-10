import { detectNetworkWithChainId, SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';

import { getNetworksFromProcessEnv } from './get-networks-from-process-env';
type SupportedNetworkKeys = keyof typeof SupportedNetworksEnum;

export const detectIfNetworkSupported = (
  chainId: number,
): {
  network: SupportedNetworksEnum | null;
  isSupported: boolean;
} => {
  const networkValidation = detectNetworkWithChainId(chainId);
  if (
    networkValidation.isSupported &&
    getNetworksFromProcessEnv().find(
      (n) => SupportedNetworksEnum[n.network as SupportedNetworkKeys] === chainId,
    )
  ) {
    return {
      isSupported: true,
      network: networkValidation.network,
    };
  }
  return {
    isSupported: false,
    network: null,
  };
};
