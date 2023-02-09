import { useEffect } from 'react';

import { selectNetwork } from '../../app/features/network';
import {
  initialiseOptimisersThunk,
  selectOptimisers,
  selectOptimisersLoadedState,
} from '../../app/features/stateless-optimisers';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useWallet } from '../../hooks/useWallet';

export const useLPVaults = (type: 'active' | 'all') => {
  const { signer } = useWallet();
  const network = useAppSelector(selectNetwork);

  const vaultsLoaded = useAppSelector(selectOptimisersLoadedState);
  const lpVaults = useAppSelector(selectOptimisers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(initialiseOptimisersThunk({ network, signer, type }));
  }, [dispatch, signer, network]);

  return {
    lpVaults,
    vaultsLoaded: vaultsLoaded === 'succeeded',
  };
};
