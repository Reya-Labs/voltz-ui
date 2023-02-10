import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { getChainsFromProcessEnv } from '../../../utilities/network/get-chains-from-process-env';
import { networkOptionsConfiguration } from './network-options-configuration';

type SupportedChainIds = keyof typeof SupportedChainId;
export const getNetworkOptions = (): Record<
  SupportedChainId,
  {
    name: string;
    Icon: React.FunctionComponent;
  }
> => {
  const allowedNetworks = getChainsFromProcessEnv();
  return allowedNetworks
    .filter(
      ({ network }) =>
        SupportedChainId[network as SupportedChainIds] &&
        networkOptionsConfiguration[SupportedChainId[network as SupportedChainIds]],
    )
    .reduce(
      (pV, { network }) => ({
        ...pV,
        [SupportedChainId[network as SupportedChainIds]]:
          networkOptionsConfiguration[SupportedChainId[network as SupportedChainIds]],
      }),
      {} as Record<
        SupportedChainId,
        {
          name: string;
          Icon: React.FunctionComponent;
        }
      >,
    );
};
