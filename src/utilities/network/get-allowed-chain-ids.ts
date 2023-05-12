import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { chainOptionsConfiguration } from '../../ui/components/VoltzPage/TopPanel/ChainSelector/chain-options-configuration';
import { getChainsFromProcessEnv } from './get-chains-from-process-env';

type SupportedChainIds = keyof typeof SupportedChainId;

export const getAllowedChainIds = (): SupportedChainId[] => {
  const allowedNetworks = getChainsFromProcessEnv();
  return allowedNetworks
    .filter(
      ({ network }) =>
        SupportedChainId[network as SupportedChainIds] &&
        chainOptionsConfiguration[SupportedChainId[network as SupportedChainIds]],
    )
    .map(({ network }) => SupportedChainId[network as SupportedChainIds]);
};
