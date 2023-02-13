import { useEffect } from 'react';

import {
  initialiseOptimisersThunk,
  selectOptimisers,
  selectOptimisersLoadedState,
} from '../../app/features/lp-optimisers';
import { selectChainId } from '../../app/features/network';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useWallet } from '../../hooks/useWallet';

export const useLPVaults = (type: 'active' | 'all') => {
  const { signer } = useWallet();
  const chainId = useAppSelector(selectChainId);

  const vaultsLoaded = useAppSelector(selectOptimisersLoadedState);
  const lpVaults = useAppSelector(selectOptimisers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!chainId) {
      return;
    }
    void dispatch(initialiseOptimisersThunk({ chainId, signer, type }));
  }, [dispatch, signer, chainId]);

  return {
    lpVaults,
    vaultsLoaded: vaultsLoaded === 'succeeded',
  };
};
