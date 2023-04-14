import { SupportedChainId } from '@voltz-protocol/v1-sdk';
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

  // todo: remove hardcoded values
  return {
    volume30DaysFormatted: chainId === SupportedChainId.arbitrum ? {
      compactNumber: '$1.25',
      compactSuffix: 'B'
    } : {
      compactNumber: '$697.40',
      compactSuffix: 'M'
    },
    totalLiquidityFormatted: chainId === SupportedChainId.arbitrum ? {
      compactNumber: '$5.61',
      compactSuffix: 'B'
    } : {
      compactNumber: '$2.22',
      compactSuffix: 'B'
    },
    idle: poolsInformationLoadedState === 'idle',
    loading: poolsInformationLoadedState === 'pending',
    error: poolsInformationLoadedState === 'failed',
  };
};
