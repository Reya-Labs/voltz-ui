import { useCallback, useMemo } from 'react';
import { providers } from 'ethers';
import { AugmentedMellowLpVault } from '@utilities';

export type useMellowLPVaultsResult = {
  lpVaults?: AugmentedMellowLpVault[];
  loading: boolean;
  error: boolean;
};

const useMellowLPVaults = (): useMellowLPVaultsResult => {
  const handleRefetch = useCallback(async () => {}, []);
  
  const lpVaults = useMemo(() => {
    const addresses = (process.env.REACT_APP_MELLOW_VAULTS) ? 
    process.env.REACT_APP_MELLOW_VAULTS
      .replace("(", "")
      .replace("[", "")
      .replace(")", "")
      .replace("]", "")
      .split(",")
    : [];

    const entries = [];
    for (let i = 0; i < addresses.length; i += 3)
    {
      entries.push(new AugmentedMellowLpVault({
        refetch: handleRefetch,
        voltzVaultAddress: addresses[i],
        erc20RootVaultAddress: addresses[i+1],
        erc20RootVaultGovernanceAddress: addresses[i+2],
        provider: providers.getDefaultProvider(
          process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK,
        )
      }));
    }
    return entries;
  }, []);

  return { lpVaults, loading: false, error: false };
};

export default useMellowLPVaults;