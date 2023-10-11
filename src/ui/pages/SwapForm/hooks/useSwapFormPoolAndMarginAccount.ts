import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../app';
import { V2Pool } from '../../../../app/features/aMMs';
import {
  getMaxNotionalAvailableThunk,
  selectSwapFormMarginAccount,
  selectSwapFormPool,
  setSwapFormMarginAccountAction,
  setSwapFormPoolAction,
  setSwapFormSignerAction,
} from '../../../../app/features/forms/trader/swap';
import { selectChainId } from '../../../../app/features/network';
import { generateAmmIdForRoute, generatePoolId } from '../../../../utilities/amm';
import { useMarginAccountsForSelection } from '../../../hooks/useMarginAccountsForSelection';
import { usePools } from '../../../hooks/usePools';
import { useWallet } from '../../../hooks/useWallet';

type UseSwapFormPoolResult = {
  pool: V2Pool | null;
  loading: boolean;
  error: boolean;
  noPoolFound: boolean;
  noMarginAccountFound: boolean;
};

export const useSwapFormPoolAndMarginAccount = (): UseSwapFormPoolResult => {
  const dispatch = useAppDispatch();
  const { ammId, poolId, marginAccountId } = useParams();
  const { pools, loading: poolsLoading, error, idle } = usePools();
  const { marginAccounts, loading: marginAccountsLoading } = useMarginAccountsForSelection();
  const pool = useAppSelector(selectSwapFormPool);
  const marginAccount = useAppSelector(selectSwapFormMarginAccount);
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
    if (!marginAccountId || marginAccountsLoading) {
      return;
    }
    const foundMarginAccount = marginAccounts.find(
      (ma) => ma.id.toLowerCase() === marginAccountId.toLowerCase(),
    );

    dispatch(
      setSwapFormMarginAccountAction({
        marginAccount: foundMarginAccount ? foundMarginAccount : null,
      }),
    );
  }, [dispatch, marginAccounts, marginAccountsLoading, marginAccountId]);

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
  }, [chainId, dispatch, pool, poolsLoading]);

  return {
    pool,
    loading: idle || loading,
    noPoolFound: !pool && !loading,
    noMarginAccountFound: !marginAccount && !marginAccountsLoading,
    error: error,
  };
};