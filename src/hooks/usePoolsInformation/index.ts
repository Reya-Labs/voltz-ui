import { useEffect } from 'react';

import {
  fetchPoolsInformationThunk,
  selectPoolsInformationLoadedState,
  selectTotalLiquidityFormatted,
  selectVolume30DaysFormatted,
} from '../../app/features/aMMs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export type UsePoolsInformationResult = {
  volume30DaysFormatted: ReturnType<typeof selectVolume30DaysFormatted>;
  totalLiquidityFormatted: ReturnType<typeof selectVolume30DaysFormatted>;
  loading: boolean;
  error: boolean;
  idle: boolean;
};

export const usePoolsInformation = (): UsePoolsInformationResult => {
  const dispatch = useAppDispatch();
  const poolsInformationLoadedState = useAppSelector(selectPoolsInformationLoadedState);
  const volume30DaysFormatted = useAppSelector(selectVolume30DaysFormatted);
  const totalLiquidityFormatted = useAppSelector(selectTotalLiquidityFormatted);

  useEffect(() => {
    // only fetch aMMs once per network
    if (poolsInformationLoadedState !== 'idle') {
      return;
    }
    void dispatch(fetchPoolsInformationThunk());
  }, [poolsInformationLoadedState, dispatch]);

  return {
    volume30DaysFormatted,
    totalLiquidityFormatted,
    idle: poolsInformationLoadedState === 'idle',
    loading: poolsInformationLoadedState === 'pending',
    error: poolsInformationLoadedState === 'failed',
  };
};
