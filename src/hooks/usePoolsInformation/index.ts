import { useEffect } from 'react';

import {
  fetchPoolsInformationThunk,
  selectPoolsInformationLoadedState,
  selectTotalLiquidityFormatted,
  selectVolume30DaysFormatted,
} from '../../app/features/aMMs';
import { selectChainId } from '../../app/features/network';
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
  const chainId = useAppSelector(selectChainId);
  const poolsInformationLoadedState = useAppSelector(selectPoolsInformationLoadedState);
  const volume30DaysFormatted = useAppSelector(selectVolume30DaysFormatted);
  const totalLiquidityFormatted = useAppSelector(selectTotalLiquidityFormatted);

  useEffect(() => {
    if (!chainId) {
      return;
    }
    // only fetch aMMs once per network
    if (poolsInformationLoadedState !== 'idle') {
      return;
    }
    void dispatch(
      fetchPoolsInformationThunk({
        chainId,
      }),
    );
  }, [chainId, poolsInformationLoadedState, dispatch]);

  return {
    volume30DaysFormatted,
    totalLiquidityFormatted,
    idle: poolsInformationLoadedState === 'idle',
    loading: poolsInformationLoadedState === 'pending',
    error: poolsInformationLoadedState === 'failed',
  };

};
