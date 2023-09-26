import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../app';
import { V2Pool } from '../../../../app/features/aMMs';
import {
  getMaxNotionalAvailableThunk,
  getPoolUnderlyingTokenAllowanceThunk,
  selectSwapFormPool,
  selectSwapFormPosition,
  selectSwapFormPositionFetchingStatus,
  setSwapFormPoolAction,
  setSwapFormSignerAction,
  simulateSwapThunk,
} from '../../../../app/features/forms/trader/swap';
import { selectChainId } from '../../../../app/features/network';
import { generateAmmIdForRoute, generatePoolId } from '../../../../utilities/amm';
import { usePools } from '../../../hooks/usePools';
import { useWallet } from '../../../hooks/useWallet';

type UseSwapFormPoolResult = {
  pool: V2Pool | null;
  loading: boolean;
  error: boolean;
  noPoolFound: boolean;
};

export const useSwapFormPool = (): UseSwapFormPoolResult => {
  const dispatch = useAppDispatch();
  const { ammId, poolId } = useParams();
  const { pools, loading: poolsLoading, error, idle } = usePools();
  const pool = useAppSelector(selectSwapFormPool);
  const position = useAppSelector(selectSwapFormPosition);
  const positionFetchingStatus = useAppSelector(selectSwapFormPositionFetchingStatus);
  const chainId = useAppSelector(selectChainId);
  const [loading, setLoading] = useState(true);

  const { signer } = useWallet();
  useEffect(() => {
    dispatch(
      setSwapFormSignerAction({
        signer,
      }),
    );
  }, [dispatch, signer]);

  useEffect(() => {
    if (!ammId || !poolId) {
      return;
    }
    if (error) {
      setLoading(false);
      return;
    }
    if (poolsLoading || idle) {
      return;
    }
    const foundPool = pools.find(
      (a) => ammId === generateAmmIdForRoute(a) && poolId === generatePoolId(a),
    );
    if (pool && foundPool && pool.id === foundPool.id) {
      setLoading(false);
      return;
    }

    dispatch(
      setSwapFormPoolAction({
        pool: foundPool ? foundPool : null,
      }),
    );
    setLoading(false);
  }, [pool, dispatch, ammId, poolId, idle, pools, poolsLoading, error]);

  useEffect(() => {
    if (!pool || !chainId || poolsLoading) {
      return;
    }

    void dispatch(getMaxNotionalAvailableThunk());
    void dispatch(getPoolUnderlyingTokenAllowanceThunk());
  }, [dispatch, pool, poolsLoading]);

  useEffect(() => {
    if (!position) {
      return;
    }

    void dispatch(simulateSwapThunk());
  }, [dispatch, position]);

  return {
    pool,
    loading:
      idle || positionFetchingStatus === 'idle' || loading || positionFetchingStatus === 'pending',
    noPoolFound: !pool && !loading,
    error: error || positionFetchingStatus === 'error',
  };
};
