import { AMM } from '@voltz-protocol/v1-sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  getFixedRateThunk,
  getInfoPostLpThunk,
  getUnderlyingTokenAllowanceThunk,
  getVariableRate24hAgoThunk,
  getVariableRateThunk,
  getWalletBalanceThunk,
  selectLpFormAMM,
  selectLpFormPosition,
  selectLpFormPositionFetchingStatus,
  selectPoolLpInfoStatus,
  setLpFormAMMAction,
  setSignerAndPositionForAMMThunk,
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
  const dispatch = useAppDispatch();
  const { ammId, poolId } = useParams();
  const { aMMs, loading: aMMsLoading, error, idle } = useAMMs();
  // TODO: Artur Rename any reference of SwapForm with LPForm
  const aMM = useAppSelector(selectLpFormAMM);
  const position = useAppSelector(selectLpFormPosition);
  const positionFetchingStatus = useAppSelector(selectLpFormPositionFetchingStatus);
  const poolLpInfoStatus = useAppSelector(selectPoolLpInfoStatus);
  const chainId = useAppSelector(selectChainId);
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

    // TODO: Artur change name to LP FORM, this part of codes update the lp-form/reducer to have a reference of AMM
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
    // TODO: Artur + Filip, check if this is really needed
    // void dispatch(getPoolLpInfoThunk());
  }, [dispatch, aMM]);

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
      setSignerAndPositionForAMMThunk({
        signer,
        chainId,
      }),
    );
  }, [dispatch, aMMsLoading, error, chainId, signer]);

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
    if (!position) {
      return;
    }

    void dispatch(getInfoPostLpThunk());
  }, [dispatch, position]);

  return {
    aMM,
    loading:
      idle ||
      positionFetchingStatus === 'idle' ||
      poolLpInfoStatus === 'idle' ||
      loading ||
      positionFetchingStatus === 'pending' ||
      poolLpInfoStatus === 'pending',
    noAMMFound: !aMM && !loading,
    error: error || positionFetchingStatus === 'error' || poolLpInfoStatus === 'error',
  };
};
