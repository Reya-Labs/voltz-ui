import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { ArbitrumIcon, EthereumIcon } from './NetworkSelector.styled';

export const networkOptionsConfiguration: Record<
  number,
  {
    name: string;
    Icon: React.FunctionComponent;
  }
> = {
  [SupportedNetworksEnum.mainnet]: {
    name: 'Ethereum',
    Icon: EthereumIcon,
  },
  [SupportedNetworksEnum.arbitrum]: {
    name: 'Arbitrum',
    Icon: ArbitrumIcon,
  },
};
