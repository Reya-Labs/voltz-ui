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
    return [new AugmentedMellowLpVault({
      refetch: handleRefetch,
      voltzVaultAddress: "0x810fB16dBC38fE2a7e5B47539a8D893d0d885131",
      erc20RootVaultAddress: "0xbfC0eCC64A06f703F1dD20e28BaBcc6cf735e6F2",
      erc20RootVaultGovernanceAddress: "0xF980BE39d79Eb07de32856e8356Eac0Dcd4CF96c",
      provider: providers.getDefaultProvider(
        process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK,
      )
    })];
  }, []);

  return { lpVaults, loading: false, error: false };
};

export default useMellowLPVaults;