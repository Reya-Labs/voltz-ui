import { AMM } from '@voltz-protocol/v1-sdk';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  getAvailableNotionalsThunk,
  getFixedRateThunk,
  getVariableRateThunk,
  getWalletBalanceThunk,
  selectSwapFormAMM,
  setSignerForAMMAction,
  setSwapFormAMMAction,
} from '../../app/features/swap-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { generateAmmIdForRoute, generatePoolId } from '../../utilities/amm';
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

    void dispatch(getWalletBalanceThunk());
    void dispatch(getFixedRateThunk());
    void dispatch(getVariableRateThunk());
    void dispatch(getAvailableNotionalsThunk());
  }, [dispatch, aMM]);

  useEffect(() => {
    void dispatch(
      setSignerForAMMAction({
        signer,
      }),
    );
  }, [dispatch, signer]);

  return {
    aMM,
    loading,
    idle,
    error,
  };
};
