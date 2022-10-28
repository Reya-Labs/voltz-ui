import { useCallback, useMemo } from 'react';
import { providers } from 'ethers';
import { AugmentedMellowLpVault } from '@utilities';
import { getMellowLPAddresses } from './utils';

export type useMellowLPVaultsResult = {
  lpVaults?: AugmentedMellowLpVault[];
  loading: boolean;
  error: boolean;
};

const useMellowLPVaults = (): useMellowLPVaultsResult => {
  const handleRefetch = useCallback(async () => {}, []);

  const lpVaults = useMemo(() => {
    const addresses = getMellowLPAddresses(process.env.REACT_APP_MELLOW_VAULTS);

    return addresses.map(
      (item) =>
        new AugmentedMellowLpVault({
          refetch: handleRefetch,
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
