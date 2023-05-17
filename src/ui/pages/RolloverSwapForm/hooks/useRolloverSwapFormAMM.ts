import { AMM } from '@voltz-protocol/v1-sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  getPoolSwapInfoThunk,
  getUnderlyingTokenAllowanceThunk,
  getWalletBalanceThunk,
  initializeAMMsAndPositionsForRolloverThunk,
  selectPoolSwapInfoStatus,
  selectRolloverSwapFormAMM,
  selectRolloverSwapFormPreviousAMM,
  selectRolloverSwapFormPreviousPosition,
  setSignerForRolloverSwapFormAction,
} from '../../../../app/features/forms/trader/rollover-swap';
import { selectChainId } from '../../../../app/features/network';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useAMMs } from '../../../../hooks/useAMMs';
import { useWallet } from '../../../../hooks/useWallet';
import {
  generateAmmIdForRoute,
  generatePoolId,
  generatePositionIdForRoute,
} from '../../../../utilities/amm';

type UseRolloverSwapFormAMMResult = {
  aMM: AMM | null;
  loading: boolean;
  error: boolean;
  noAMMFound: boolean;
};

export const useRolloverSwapFormAMM = (): UseRolloverSwapFormAMMResult => {
  const dispatch = useAppDispatch();
  const { ammId, poolId, positionId } = useParams();
  const { aMMs, loading: aMMsLoading, error, idle } = useAMMs();
  const aMM = useAppSelector(selectRolloverSwapFormAMM);
  const previousAMM = useAppSelector(selectRolloverSwapFormPreviousAMM);
  const previousPosition = useAppSelector(selectRolloverSwapFormPreviousPosition);
  const poolSwapInfoStatus = useAppSelector(selectPoolSwapInfoStatus);
  const chainId = useAppSelector(selectChainId);
  const [loading, setLoading] = useState(true);

  const { signer } = useWallet();

  useEffect(() => {
    if (!chainId) {
      return;
    }
    if (!ammId || !poolId || !positionId) {
      return;
    }
    if (error) {
      setLoading(false);
      return;
    }
    if (aMMsLoading || idle) {
      return;
    }
    if (
      previousAMM &&
      previousPosition &&
      generatePoolId(previousAMM) === poolId &&
      generateAmmIdForRoute(previousAMM) === ammId &&
      generatePositionIdForRoute(previousPosition) === positionId
    ) {
      setLoading(false);
      return;
    }

    setLoading(true);
    void dispatch(
      initializeAMMsAndPositionsForRolloverThunk({
        routePoolId: poolId,
        routeAmmId: ammId,
        routePositionId: positionId,
        signer,
        chainId,
      }),
    );
  }, [
    signer,
    chainId,
    positionId,
    dispatch,
    ammId,
    poolId,
    idle,
    aMMs,
    aMMsLoading,
    error,
    previousAMM,
    previousPosition,
  ]);

  useEffect(() => {
    if (!aMM) {
      return;
    }

    void dispatch(getPoolSwapInfoThunk());
  }, [dispatch, aMM]);

  useEffect(() => {
    if (error) {
      return;
    }
    if (aMMsLoading) {
      return;
    }
    if (!aMM?.id || !previousAMM?.id) {
      return;
    }

    void dispatch(
      setSignerForRolloverSwapFormAction({
        signer,
      }),
    );
  }, [previousAMM?.id, aMM?.id, dispatch, aMMsLoading, error, signer]);

  useEffect(() => {
    if (!aMM || !aMM.signer || !chainId) {
      return;
    }

    void dispatch(getWalletBalanceThunk());
    void dispatch(getUnderlyingTokenAllowanceThunk({ chainId }));
  }, [dispatch, aMM, aMM?.signer, chainId]);

  return {
    aMM,
    loading: idle || poolSwapInfoStatus === 'idle' || loading || poolSwapInfoStatus === 'pending',
    noAMMFound: !aMM && !loading,
    error: error || poolSwapInfoStatus === 'error',
  };
};
