import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { getChainsFromProcessEnv } from '../get-chains-from-process-env';

type SupportedChainIds = keyof typeof SupportedChainId;

export const getAllowedChainIds = (
  networkConfigurationString = process.env.REACT_APP_NETWORK_SELECTOR_NETWORKS,
): SupportedChainId[] => {
  const allowedNetworks = getChainsFromProcessEnv(networkConfigurationString) || [];
  return allowedNetworks
    .filter(({ network }) => SupportedChainId[network as SupportedChainIds])
    .map(({ network }) => SupportedChainId[network as SupportedChainIds]);
};
