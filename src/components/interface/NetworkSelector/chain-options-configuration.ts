import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { ArbitrumIcon, AvalancheIcon, EthereumIcon } from './NetworkSelector.styled';

export const chainOptionsConfiguration: Record<
  SupportedChainId,
  {
    name: string;
    Icon: React.FunctionComponent;
  }
> = {
  [SupportedChainId.mainnet]: {
    name: 'Ethereum',
    Icon: EthereumIcon,
  },
  [SupportedChainId.goerli]: {
    name: 'Görli',
    Icon: EthereumIcon,
  },
  [SupportedChainId.arbitrum]: {
    name: 'Arbitrum',
    Icon: ArbitrumIcon,
  },
  [SupportedChainId.arbitrumGoerli]: {
    name: 'Görli Arbitrum',
    Icon: ArbitrumIcon,
  },
  [SupportedChainId.avalanche]: {
    name: 'Avalanche',
    Icon: AvalancheIcon,
  },
  [SupportedChainId.avalancheFuji]: {
    name: 'Avalanche Fuji',
    Icon: AvalancheIcon,
  },
  [SupportedChainId.spruce]: {
    name: 'Spruce',
    Icon: AvalancheIcon,
  },
};
