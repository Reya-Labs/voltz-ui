import { useEffect } from 'react';

import { initialiseOptimisersThunk, selectOptimisers } from '../../app/features/stateless-optimisers';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useWallet } from '../../hooks/useWallet';

export const useLPVaults = () => {
  const { account } = useWallet();
  
  const vaultsLoaded = useAppSelector((state) => state.statelessOptimisers.optimisersLoadedState);
  const shouldInitVaults = vaultsLoaded === 'idle';
  const lpVaults = useAppSelector(selectOptimisers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(initialiseOptimisersThunk({ userAddress: account ? account : undefined}));
  }, [shouldInitVaults, dispatch, account]);

  return {
    lpVaults,
    vaultsLoaded: vaultsLoaded === 'succeeded',
  };
};
