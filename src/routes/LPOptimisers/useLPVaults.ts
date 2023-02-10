import { useEffect } from 'react';

import { selectChainId } from '../../app/features/network';
import {
  initialiseOptimisersThunk,
  selectOptimisers,
  selectOptimisersLoadedState,
} from '../../app/features/stateless-optimisers';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useWallet } from '../../hooks/useWallet';

export const useLPVaults = (type: 'active' | 'all') => {
  const { signer } = useWallet();
  const chainId = useAppSelector(selectChainId);

  const vaultsLoaded = useAppSelector(selectOptimisersLoadedState);
  const lpVaults = useAppSelector(selectOptimisers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(initialiseOptimisersThunk({ chainId, signer, type }));
  }, [dispatch, signer, chainId]);

  return {
    lpVaults,
    vaultsLoaded: vaultsLoaded === 'succeeded',
  };
};
