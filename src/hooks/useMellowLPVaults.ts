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
      id: "0x0000000000000000000000000000000000000000",
      provider: providers.getDefaultProvider(
        process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK,
      )
    })];
  }, []);

  return { lpVaults, loading: false, error: false };
};

export default useMellowLPVaults;