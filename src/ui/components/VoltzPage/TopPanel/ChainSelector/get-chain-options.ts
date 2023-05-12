import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { getAllowedChainIds } from '../../../../../utilities/network/get-allowed-chain-ids';
import { chainOptionsConfiguration } from './chain-options-configuration';

export const getChainOptions = (): {
  id: SupportedChainId;
  name: string;
  Icon: React.FunctionComponent;
}[] => {
  const allowedNetworks = getAllowedChainIds();
  return allowedNetworks.map((network) => ({
    id: network,
    name: chainOptionsConfiguration[network].name,
    Icon: chainOptionsConfiguration[network].Icon,
  }));
};
