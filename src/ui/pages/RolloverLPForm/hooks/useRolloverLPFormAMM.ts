import { AMM } from '@voltz-protocol/v1-sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  getPoolLpInfoThunk,
  getUnderlyingTokenAllowanceThunk,
  getWalletBalanceThunk,
  initializeAMMsAndPositionsForRolloverThunk,
  selectPoolLpInfoStatus,
  selectRolloverLpFormAMM,
  selectRolloverLpFormPreviousAMM,
  selectRolloverLpFormPreviousPosition,
  setSignerForRolloverLpFormAction,
} from '../../../../app/features/forms/lps/rollover-lp';
import { selectChainId } from '../../../../app/features/network';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useAMMs } from '../../../../hooks/useAMMs';
import { useWallet } from '../../../../hooks/useWallet';
import {
  generateAmmIdForRoute,
  generatePoolId,
  generatePositionIdForRoute,
} from '../../../../utilities/amm';

export type UseRolloverLPFormAMMResult = {
  aMM: AMM | null;
  loading: boolean;
  error: boolean;
  noAMMFound: boolean;
};

export const useRolloverLPFormAMM = (): UseRolloverLPFormAMMResult => {
  const dispatch = useAppDispatch();
  const { ammId, poolId, positionId } = useParams();
  const { aMMs, loading: aMMsLoading, error, idle } = useAMMs();
  const aMM = useAppSelector(selectRolloverLpFormAMM);
  const previousAMM = useAppSelector(selectRolloverLpFormPreviousAMM);
  const previousPosition = useAppSelector(selectRolloverLpFormPreviousPosition);
  const poolLpInfoStatus = useAppSelector(selectPoolLpInfoStatus);
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
    if (!aMM || !previousAMM || !previousPosition) {
      return;
    }
    void dispatch(getPoolLpInfoThunk());
  }, [dispatch, previousAMM, previousPosition, aMM]);

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
      setSignerForRolloverLpFormAction({
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
    loading: idle || loading,
    noAMMFound: !aMM && !loading,
    error: error || poolLpInfoStatus === 'error',
  };
};
