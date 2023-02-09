import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { getAllowedNetworks } from '../../../utilities/get-allowed-networks';
import { networkOptionsConfiguration } from './network-options-configuration';

type SupportedNetworkKeys = keyof typeof SupportedNetworksEnum;
export const getNetworkOptions = (): Record<
  SupportedNetworksEnum,
  {
    name: string;
    Icon: React.FunctionComponent;
  }
> => {
  const allowedNetworks = getAllowedNetworks();
  return allowedNetworks
    .filter(
      (allowedNetwork) =>
        SupportedNetworksEnum[allowedNetwork as SupportedNetworkKeys] &&
        networkOptionsConfiguration[SupportedNetworksEnum[allowedNetwork as SupportedNetworkKeys]],
    )
    .reduce(
      (pV, allowedNetwork) => ({
        ...pV,
        [SupportedNetworksEnum[allowedNetwork as SupportedNetworkKeys]]:
          networkOptionsConfiguration[
            SupportedNetworksEnum[allowedNetwork as SupportedNetworkKeys]
          ],
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
