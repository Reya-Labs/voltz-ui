import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { getChainsFromProcessEnv } from '../../../../../utilities/network/get-chains-from-process-env';
import { chainOptionsConfiguration } from './chain-options-configuration';

type SupportedChainIds = keyof typeof SupportedChainId;
export const getChainOptions = (): {
  id: SupportedChainId;
  name: string;
  Icon: React.FunctionComponent;
}[] => {
  const allowedNetworks = getChainsFromProcessEnv();
  return allowedNetworks
    .filter(
      ({ network }) =>
        SupportedChainId[network as SupportedChainIds] &&
        chainOptionsConfiguration[SupportedChainId[network as SupportedChainIds]],
    )
    .map(({ network }) => ({
      id: SupportedChainId[network as SupportedChainIds],
      name: chainOptionsConfiguration[SupportedChainId[network as SupportedChainIds]].name,
      Icon: chainOptionsConfiguration[SupportedChainId[network as SupportedChainIds]].Icon,
    }));
};
