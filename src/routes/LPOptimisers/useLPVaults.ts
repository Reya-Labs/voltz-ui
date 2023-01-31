import { useEffect } from 'react';

import {
  initialiseOptimisersThunk,
  selectOptimisers,
  selectOptimisersLoadedState,
} from '../../app/features/stateless-optimisers';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useWallet } from '../../hooks/useWallet';

export const useLPVaults = () => {
  const { signer } = useWallet();

  const vaultsLoaded = useAppSelector(selectOptimisersLoadedState);
  const lpVaults = useAppSelector(selectOptimisers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(initialiseOptimisersThunk({ signer }));
  }, [dispatch, signer]);

  return {
    lpVaults,
    vaultsLoaded: vaultsLoaded === 'succeeded',
  };
};
