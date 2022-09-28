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
      voltzVaultAddress: "0x7b9ea740314356b48971381e190d43bba8c02762",
      erc20RootVaultAddress: "0xb4eF1755a547585c804F0129F65b4A3f325c9D51",
      provider: providers.getDefaultProvider(
        process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK,
      )
    })];
  }, []);

  return { lpVaults, loading: false, error: false };
};

export default useMellowLPVaults;