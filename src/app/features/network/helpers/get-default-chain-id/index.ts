import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { getChainId } from '../chain-store';
import { getChainsFromProcessEnv } from '../get-chains-from-process-env';

type SupportedChainIds = keyof typeof SupportedChainId;

export const getDefaultChainId = (): SupportedChainId => {
  const allowedNetworks = getChainsFromProcessEnv();
  const storedChainId = getChainId();

  const supportedNetwork =
    allowedNetworks.find(
      ({ network }) =>
        storedChainId === SupportedChainId[network as SupportedChainIds] &&
        SupportedChainId[network as SupportedChainIds],
    )?.network ||
    allowedNetworks.find(({ network }) => SupportedChainId[network as SupportedChainIds])?.network;

  return supportedNetwork
    ? SupportedChainId[supportedNetwork as SupportedChainIds]
    : SupportedChainId.mainnet;
};
