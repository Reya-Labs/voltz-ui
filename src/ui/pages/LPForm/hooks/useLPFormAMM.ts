import { AMM } from '@voltz-protocol/v1-sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  getPoolLpInfoThunk,
  selectLpFormAMM,
  selectLpFormPositionsFetchingStatus,
  selectPoolLpInfoStatus,
  selectUserInputFixedLower,
  selectUserInputFixedUpper,
  setLpFormAMMAction,
  setSignerAndGetPositionsForLPThunk,
  setUserInputFixedLowerAction,
  setUserInputFixedUpperAction,
  trackPageViewAction,
} from '../../../../app/features/forms/lps/lp';
import { selectChainId } from '../../../../app/features/network';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useAMMs } from '../../../../hooks/useAMMs';
import { useAppSearchParams } from '../../../../hooks/useAppSearchParams';
import { useWallet } from '../../../../hooks/useWallet';
import { generateAmmIdForRoute, generatePoolId } from '../../../../utilities/amm';
import { useGetInfoPostLP } from './useGetInfoPostLP';
import { useGetWalletBalanceAndUnderlyingTokenAllowance } from './useGetWalletBalanceAndUnderlyingTokenAllowance';

export type UseLPFormAMMResult = {
  aMM: AMM | null;
  loading: boolean;
  error: boolean;
  noAMMFound: boolean;
};

export const useLPFormAMM = (): UseLPFormAMMResult => {
  const dispatch = useAppDispatch();
  const { ammId, poolId } = useParams();
  const { aMMs, loading: aMMsLoading, error, idle } = useAMMs();
  const aMM = useAppSelector(selectLpFormAMM);
  const positionsFetchingStatus = useAppSelector(selectLpFormPositionsFetchingStatus);
  const poolLpInfoStatus = useAppSelector(selectPoolLpInfoStatus);
  const chainId = useAppSelector(selectChainId);
  const [queryFixedLower, queryFixedUpper] = useAppSearchParams(['fixedLower', 'fixedUpper']);

  const fixedRateLower = useAppSelector(selectUserInputFixedLower);
  const fixedRateUpper = useAppSelector(selectUserInputFixedUpper);

  const [loading, setLoading] = useState(true);

  const { signer, account } = useWallet();

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
    void dispatch(getPoolLpInfoThunk());
  }, [dispatch, aMM, fixedRateLower, fixedRateUpper]);

  useEffect(() => {
    if (!aMM?.id) {
      return;
    }
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
      setSignerAndGetPositionsForLPThunk({
        signer,
        chainId,
      }),
    );
  }, [aMM?.id, dispatch, aMMsLoading, error, chainId, signer]);

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
      dispatch(
        trackPageViewAction({
          isEdit: false,
          account: account || '',
        }),
      );
      return;
    }

    dispatch(
      trackPageViewAction({
        isEdit: true,
        account: account || '',
      }),
    );
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

  useGetWalletBalanceAndUnderlyingTokenAllowance();
  useGetInfoPostLP();

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
