import { AMM } from '@voltz-protocol/v1-sdk';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { selectChainId } from '../../app/features/network';
import {
  getFixedRateThunk,
  getPoolSwapInfoThunk,
  getUnderlyingTokenAllowanceThunk,
  getVariableRateThunk,
  getWalletBalanceThunk,
  selectSwapFormAMM,
  selectSwapFormPositionFetchingStatus,
  setSignerAndPositionForAMMThunk,
  setSwapFormAMMAction,
} from '../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { generateAmmIdForRoute, generatePoolId } from '../../utilities/amm';
import { ONE_DAY_IN_MS } from '../../utilities/constants';
import { useAMMs } from '../useAMMs';
import { useWallet } from '../useWallet';

export type UseAMMsResult = {
  aMM: AMM | null;
  loading: boolean;
  error: boolean;
  idle: boolean;
};

export const useSwapFormAMM = (): UseAMMsResult => {
  const dispatch = useAppDispatch();
  const { ammId, poolId } = useParams();
  const { aMMs, loading, error, idle } = useAMMs();
  const aMM = useAppSelector(selectSwapFormAMM);
  const positionFetchingStatus = useAppSelector(selectSwapFormPositionFetchingStatus);
  const chainId = useAppSelector(selectChainId);

  const { signer } = useWallet();

  useEffect(() => {
    if (!ammId || !poolId) {
      return;
    }
    if (error) {
      return;
    }
    if (loading) {
      return;
    }
    const foundAMM = aMMs.find(
      (a) => ammId === generateAmmIdForRoute(a) && poolId === generatePoolId(a),
    );

    dispatch(
      setSwapFormAMMAction({
        amm: foundAMM ? foundAMM : null,
      }),
    );
  }, [dispatch, ammId, poolId, aMMs, loading, error]);

  useEffect(() => {
    if (!aMM) {
      return;
    }

    void dispatch(getFixedRateThunk());
    void dispatch(getVariableRateThunk({}));
    void dispatch(getVariableRateThunk({ timestampInMS: Date.now() - ONE_DAY_IN_MS }));
    void dispatch(getPoolSwapInfoThunk());
  }, [dispatch, aMM]);

  useEffect(() => {
    if (!chainId) {
      return;
    }
    void dispatch(
      setSignerAndPositionForAMMThunk({
        signer,
        chainId,
      }),
    );
  }, [dispatch, chainId, signer]);

  useEffect(() => {
    if (!aMM || !aMM.signer) {
      return;
    }

    void dispatch(getWalletBalanceThunk());
    void dispatch(getUnderlyingTokenAllowanceThunk());
  }, [dispatch, aMM, aMM?.signer]);

  return {
    aMM,
    loading: loading || positionFetchingStatus === 'pending',
    idle,
    error: error || positionFetchingStatus === 'error',
  };
};
