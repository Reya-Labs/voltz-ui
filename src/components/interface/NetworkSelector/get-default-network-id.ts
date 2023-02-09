import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';

import { getAllowedNetworks } from '../../../utilities/get-allowed-networks';
import { networkOptionsConfiguration } from './network-options-configuration';
type SupportedNetworkKeys = keyof typeof SupportedNetworksEnum;

export const getDefaultNetworkId = (): SupportedNetworksEnum => {
  const allowedNetworks = getAllowedNetworks();
  const firstSupported = allowedNetworks.filter(
    (allowedNetwork) =>
      SupportedNetworksEnum[allowedNetwork as SupportedNetworkKeys] &&
      networkOptionsConfiguration[SupportedNetworksEnum[allowedNetwork as SupportedNetworkKeys]],
  )[0];
  return SupportedNetworksEnum[firstSupported as SupportedNetworkKeys];
};
