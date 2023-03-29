import { AMM } from '@voltz-protocol/v1-sdk';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import {
  getFixedRateThunk,
  getInfoPostLpThunk,
  getPoolLpInfoThunk,
  getUnderlyingTokenAllowanceThunk,
  getVariableRate24hAgoThunk,
  getVariableRateThunk,
  getWalletBalanceThunk,
  selectLpFormAMM,
  selectLpFormPositionsFetchingStatus,
  selectLpFormSelectedPosition,
  selectPoolLpInfoStatus,
  selectUserInputFixedLower,
  selectUserInputFixedUpper,
  setLpFormAMMAction,
  setSignerAndPositionsForAMMThunk,
  setUserInputFixedLowerAction,
  setUserInputFixedUpperAction,
} from '../../../../app/features/lp-form';
import { selectChainId } from '../../../../app/features/network';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useAMMs } from '../../../../hooks/useAMMs';
import { useWallet } from '../../../../hooks/useWallet';
import { generateAmmIdForRoute, generatePoolId } from '../../../../utilities/amm';
import { getAlchemyKeyForChain } from '../../../../utilities/network/get-alchemy-key-for-chain';

export type UseAMMsResult = {
  aMM: AMM | null;
  loading: boolean;
  error: boolean;
  noAMMFound: boolean;
};

export const useLPFormAMM = (): UseAMMsResult => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { ammId, poolId } = useParams();
  const { aMMs, loading: aMMsLoading, error, idle } = useAMMs();
  const aMM = useAppSelector(selectLpFormAMM);
  const selectedPosition = useAppSelector(selectLpFormSelectedPosition);
  const positionsFetchingStatus = useAppSelector(selectLpFormPositionsFetchingStatus);
  const poolLpInfoStatus = useAppSelector(selectPoolLpInfoStatus);
  const chainId = useAppSelector(selectChainId);
  const queryFixedLower = searchParams.get('fixedLower');
  const queryFixedUpper = searchParams.get('fixedUpper');

  const fixedRateLower = useAppSelector(selectUserInputFixedLower);
  const fixedRateUpper = useAppSelector(selectUserInputFixedUpper); 

  const [loading, setLoading] = useState(true);

  const { signer } = useWallet();

  useEffect(() => {
    if (!ammId || !poolId) {
      return;
    }
    if (error) {
      setLoading(false);
      return;
    }
    if (aMMsLoading || idle) {
      return;
    }
    const foundAMM = aMMs.find(
      (a) => ammId === generateAmmIdForRoute(a) && poolId === generatePoolId(a),
    );
    if (aMM && foundAMM && aMM.id === foundAMM.id) {
      setLoading(false);
      return;
    }

    dispatch(
      setLpFormAMMAction({
        amm: foundAMM ? foundAMM : null,
      }),
    );
    setLoading(false);
  }, [aMM, dispatch, ammId, poolId, idle, aMMs, aMMsLoading, error]);

  useEffect(() => {
    if (!aMM) {
      return;
    }

    void dispatch(getFixedRateThunk());
    void dispatch(getVariableRateThunk());
    void dispatch(getVariableRate24hAgoThunk());
  }, [dispatch, aMM]);

  useEffect(() => {
    if (!aMM) {
      return;
    }
    void dispatch(getPoolLpInfoThunk());
  }, [dispatch, aMM, fixedRateLower, fixedRateUpper]);

  useEffect(() => {
    if (!chainId) {
      return;
    }
    if (error) {
      return;
    }
    if (aMMsLoading) {
      return;
    }
    void dispatch(
      setSignerAndPositionsForAMMThunk({
        signer,
        chainId,
      }),
    );
  }, [dispatch, aMMsLoading, error, chainId, signer]);

  useEffect(() => {
    if (positionsFetchingStatus !== 'success') {
      return;
    }
    if (!queryFixedLower || !queryFixedUpper) {
      return;
    }
    const fixedLower = parseFloat(queryFixedLower);
    const fixedUpper = parseFloat(queryFixedUpper);
    if (isNaN(fixedLower) || isNaN(fixedUpper)) {
      return;
    }

    dispatch(
      setUserInputFixedLowerAction({
        value: fixedLower,
      }),
    );
    dispatch(
      setUserInputFixedUpperAction({
        value: fixedUpper,
      }),
    );
  }, [dispatch, positionsFetchingStatus, queryFixedLower, queryFixedUpper]);

  useEffect(() => {
    if (!aMM || !aMM.signer || !chainId) {
      return;
    }

    void dispatch(getWalletBalanceThunk());
    void dispatch(
      getUnderlyingTokenAllowanceThunk({ chainId, alchemyApiKey: getAlchemyKeyForChain(chainId) }),
    );
  }, [dispatch, aMM, aMM?.signer, chainId]);

  useEffect(() => {
    if (!selectedPosition) {
      return;
    }

    void dispatch(getInfoPostLpThunk());
  }, [dispatch, selectedPosition]);

  return {
    aMM,
    loading:
      idle ||
      positionsFetchingStatus === 'idle' ||
      loading ||
      positionsFetchingStatus === 'pending',
    noAMMFound: !aMM && !loading,
    error: error || positionsFetchingStatus === 'error' || poolLpInfoStatus === 'error',
  };
};
