import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { chainOptionsConfiguration } from '../../../../ui/components/VoltzPage/TopPanel/ChainSelector/chain-options-configuration';
import { getChainId } from './chain-store';
import { getChainsFromProcessEnv } from './get-chains-from-process-env';

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
