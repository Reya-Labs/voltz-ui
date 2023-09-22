import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app';
import {
  initialiseOptimisersThunk,
  selectOptimisers,
  selectOptimisersLoadedState,
} from '../../app/features/lp-optimisers';
import { selectChainId } from '../../app/features/network';
import { useWallet } from './useWallet';

export const useLPVaults = () => {
  const { signer } = useWallet();
  const chainId = useAppSelector(selectChainId);
  const vaultsLoadedState = useAppSelector(selectOptimisersLoadedState);
  const lpVaults = useAppSelector(selectOptimisers);
  const dispatch = useAppDispatch();

  const vaultsLoaded = vaultsLoadedState === 'succeeded';
  const vaultsError = vaultsLoadedState === 'failed';
  const vaultsLoading = vaultsLoadedState === 'pending' || vaultsLoadedState === 'idle';

  useEffect(() => {
    if (!chainId) {
      return;
    }
    if (vaultsLoaded) {
      return;
    }
    void dispatch(initialiseOptimisersThunk({ chainId, signer }));
  }, [vaultsLoaded, dispatch, signer, chainId]);

  return {
    lpVaults,
    activeLpVaults: lpVaults.filter((vault) => !vault.expired && !vault.deprecated),
    vaultsLoaded,
    vaultsError,
    vaultsLoading,
  };
};
