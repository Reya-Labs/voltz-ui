import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { getAllowedChainIds } from '../../../../../app/features/network';
import { chainOptionsConfiguration } from './chain-options-configuration';

export const getChainOptions = (): {
  id: SupportedChainId;
  name: string;
  Icon: React.FunctionComponent;
}[] => {
  const allowedNetworks = getAllowedChainIds();
  return allowedNetworks
    .filter((network) => chainOptionsConfiguration[network])
    .map((network) => ({
      id: network,
      name: chainOptionsConfiguration[network].name,
      Icon: chainOptionsConfiguration[network].Icon,
    }));
};
