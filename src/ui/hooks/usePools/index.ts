import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app';
import {
  initialisePoolsThunk,
  selectPools,
  selectPoolsLoadedState,
  V2Pool,
} from '../../../app/features/aMMs';

type UsePoolsResult = {
  pools: V2Pool[];
  loading: boolean;
  error: boolean;
  idle: boolean;
};

export const usePools = (): UsePoolsResult => {
  const dispatch = useAppDispatch();
  const loadedState = useAppSelector(selectPoolsLoadedState);
  const pools = useAppSelector(selectPools);

  useEffect(() => {
    // only fetch aMMs once per network
    if (loadedState !== 'idle') {
      return;
    }
    void dispatch(initialisePoolsThunk());
  }, [loadedState, dispatch]);

  return {
    pools,
    idle: loadedState === 'idle',
    loading: loadedState === 'pending',
    error: loadedState === 'failed',
  };
};
