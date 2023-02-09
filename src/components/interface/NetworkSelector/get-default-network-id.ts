import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';

import { getNetworksFromProcessEnv } from '../../../utilities/get-networks-from-process-env';
import { networkOptionsConfiguration } from './network-options-configuration';
type SupportedNetworkKeys = keyof typeof SupportedNetworksEnum;

export const getDefaultNetworkId = (): SupportedNetworksEnum => {
  const allowedNetworks = getNetworksFromProcessEnv();
  const firstSupportedNetwork = allowedNetworks.find(
    ({ network }) =>
      SupportedNetworksEnum[network as SupportedNetworkKeys] &&
      networkOptionsConfiguration[SupportedNetworksEnum[network as SupportedNetworkKeys]],
  )?.network;
  return SupportedNetworksEnum[firstSupportedNetwork as SupportedNetworkKeys];
};
