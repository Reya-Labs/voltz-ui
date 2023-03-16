import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { ReactComponent as ArbitrumIcon } from './icons/arbitrum.svg';
import { ReactComponent as EthereumIcon } from './icons/ethereum.svg';

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
