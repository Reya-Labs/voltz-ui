import { useCallback, useMemo } from 'react';
import useWallet from './useWallet';
import { isNull } from 'lodash';
import { providers } from 'ethers';
import { AugmentedMellowLpVault } from '@utilities';

export type useMellowLPVaultsResult = {
  lpVaults?: AugmentedMellowLpVault[];
  loading: boolean;
  error: boolean;
};

const useMellowLPVaults = (): useMellowLPVaultsResult => {
  const { signer } = useWallet();
  const isSignerAvailable = !isNull(signer);

  const handleRefetch = useCallback(async () => {}, []);
  
  const lpVaults = useMemo(() => {
    return [new AugmentedMellowLpVault({
      refetch: handleRefetch,
      id: "0x0000000000000000000000000000000000000000",
      signer,
      provider: providers.getDefaultProvider(
        process.env.REACT_APP_DEFAULT_PROVIDER_NETWORK,
      )
    })];
  }, [isSignerAvailable]);


  return { lpVaults, loading: false, error: false };
};

export default useMellowLPVaults;