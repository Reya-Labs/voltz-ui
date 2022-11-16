import { useMemo } from 'react';
import { providers } from 'ethers';
import { getMellowLPAddresses } from './utils';

import { MellowLpVault } from '@voltz-protocol/v1-sdk';

export type useMellowLPVaultsResult = {
  lpVaults?: MellowLpVault[];
  loading: boolean;
  error: boolean;
};

const useMellowLPVaults = (): useMellowLPVaultsResult => {
  const lpVaults = useMemo(() => {
    const addresses = getMellowLPAddresses(process.env.REACT_APP_MELLOW_VAULTS);

    return addresses.map(
      (item) =>
        new MellowLpVault({
          ethWrapperAddress: process.env.REACT_APP_MELLOW_ETH_WRAPPER || '',
          voltzVaultAddress: item.voltzVaultAddress,
          erc20RootVaultAddress: item.erc20RootVaultAddress,
          erc20RootVaultGovernanceAddress: item.erc20RootVaultGovernanceAddress,
          provider: providers.getDefaultProvider(process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK),
        }),
    );
  }, []);

  return { lpVaults, loading: false, error: false };
};

export default useMellowLPVaults;
