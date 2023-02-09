import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { getAllowedNetworks } from '../../../utilities/get-allowed-networks';
import { ArbitrumIcon, EthereumIcon } from './NetworkSelector.styled';

type SupportedNetworkKeys = keyof typeof SupportedNetworksEnum;
export const getNetworkOptions = (): Record<
  SupportedNetworksEnum,
  {
    name: string;
    Icon: React.FunctionComponent;
  }
> => {
  const options: Record<
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
  const allowedNetworks = getAllowedNetworks();
  return allowedNetworks
    .filter(
      (allowedNetwork) =>
        SupportedNetworksEnum[allowedNetwork as SupportedNetworkKeys] &&
        options[SupportedNetworksEnum[allowedNetwork as SupportedNetworkKeys]],
    )
    .reduce(
      (pV, allowedNetwork) => ({
        ...pV,
        [SupportedNetworksEnum[allowedNetwork as SupportedNetworkKeys]]:
          options[SupportedNetworksEnum[allowedNetwork as SupportedNetworkKeys]],
      }),
      {} as Record<
        SupportedNetworksEnum,
        {
          name: string;
          Icon: React.FunctionComponent;
        }
      >,
    );
};
