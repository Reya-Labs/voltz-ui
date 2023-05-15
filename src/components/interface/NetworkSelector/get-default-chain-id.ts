import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { getChainId, getChainsFromProcessEnv } from '../../../app/features/network';
import { chainOptionsConfiguration } from './chain-options-configuration';
type SupportedChainIds = keyof typeof SupportedChainId;

export const getDefaultChainId = (): SupportedChainId => {
  const allowedNetworks = getChainsFromProcessEnv();
  const storedChainId = getChainId();

  let supportedNetwork: string | undefined;
  if (storedChainId) {
    supportedNetwork = allowedNetworks.find(
      ({ network }) =>
        storedChainId === SupportedChainId[network as SupportedChainIds] &&
        SupportedChainId[network as SupportedChainIds] &&
        chainOptionsConfiguration[SupportedChainId[network as SupportedChainIds]],
    )?.network;
  }
  if (!supportedNetwork) {
    supportedNetwork = allowedNetworks.find(
      ({ network }) =>
        SupportedChainId[network as SupportedChainIds] &&
        chainOptionsConfiguration[SupportedChainId[network as SupportedChainIds]],
    )?.network;
  }
  return SupportedChainId[supportedNetwork as SupportedChainIds];
};
