import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';
import React from 'react';

import { getNetworksFromProcessEnv } from '../../../utilities/get-networks-from-process-env';
import { networkOptionsConfiguration } from './network-options-configuration';

type SupportedNetworkKeys = keyof typeof SupportedNetworksEnum;
export const getNetworkOptions = (): Record<
  SupportedNetworksEnum,
  {
    name: string;
    Icon: React.FunctionComponent;
  }
> => {
  const allowedNetworks = getNetworksFromProcessEnv();
  return allowedNetworks
    .filter(
      ({ network }) =>
        SupportedNetworksEnum[network as SupportedNetworkKeys] &&
        networkOptionsConfiguration[SupportedNetworksEnum[network as SupportedNetworkKeys]],
    )
    .reduce(
      (pV, { network }) => ({
        ...pV,
        [SupportedNetworksEnum[network as SupportedNetworkKeys]]:
          networkOptionsConfiguration[SupportedNetworksEnum[network as SupportedNetworkKeys]],
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
