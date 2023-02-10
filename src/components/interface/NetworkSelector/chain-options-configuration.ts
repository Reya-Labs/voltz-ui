import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { ArbitrumIcon, EthereumIcon } from './NetworkSelector.styled';

export const chainOptionsConfiguration: Record<
  number,
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
};
