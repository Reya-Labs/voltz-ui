import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { getChainsFromProcessEnv } from '../../../utilities/network/get-chains-from-process-env';
import { networkOptionsConfiguration } from './network-options-configuration';
type SupportedChainIds = keyof typeof SupportedChainId;

export const getDefaultChainId = (): SupportedChainId => {
  const allowedNetworks = getChainsFromProcessEnv();
  const firstSupportedNetwork = allowedNetworks.find(
    ({ network }) =>
      SupportedChainId[network as SupportedChainIds] &&
      networkOptionsConfiguration[SupportedChainId[network as SupportedChainIds]],
  )?.network;
  return SupportedChainId[firstSupportedNetwork as SupportedChainIds];
};
