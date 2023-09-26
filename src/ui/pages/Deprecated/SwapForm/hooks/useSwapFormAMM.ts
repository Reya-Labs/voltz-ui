import { AMM } from '@voltz-protocol/v1-sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../../app';
import {
  getInfoPostSwapThunk,
  getPoolSwapInfoThunk,
  getUnderlyingTokenAllowanceThunk,
  getWalletBalanceThunk,
  selectPoolSwapInfoStatus,
  selectSwapFormAMM,
  selectSwapFormPosition,
  selectSwapFormPositionFetchingStatus,
  setSignerAndPositionForAMMThunk,
  setSwapFormAMMAction,
} from '../../../../../app/features/forms/trader/deprecated/swap';
import { selectChainId } from '../../../../../app/features/network';
import { generateAmmIdForRoute, generatePoolId } from '../../../../../utilities/amm';
import { useAMMs } from '../../../../hooks/useAMMs';
import { useWallet } from '../../../../hooks/useWallet';

type UseSwapFormAMMResult = {
  aMM: AMM | null;
  loading: boolean;
  error: boolean;
  noAMMFound: boolean;
};

export const useSwapFormAMM = (): UseSwapFormAMMResult => {
  const dispatch = useAppDispatch();
  const { ammId, poolId } = useParams();
  const { aMMs, loading: aMMsLoading, error, idle } = useAMMs();
  const aMM = useAppSelector(selectSwapFormAMM);
  const position = useAppSelector(selectSwapFormPosition);
  const positionFetchingStatus = useAppSelector(selectSwapFormPositionFetchingStatus);
  const poolSwapInfoStatus = useAppSelector(selectPoolSwapInfoStatus);
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

    dispatch(
      setSwapFormAMMAction({
        amm: foundAMM ? foundAMM : null,
      }),
    );
    setLoading(false);
  }, [aMM, dispatch, ammId, poolId, idle, aMMs, aMMsLoading, error]);

  useEffect(() => {
    if (!aMM) {
      return;
    }

    void dispatch(getPoolSwapInfoThunk());
  }, [dispatch, aMM]);

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
      setSignerAndPositionForAMMThunk({
        signer,
        chainId,
      }),
    );
  }, [aMM?.id, dispatch, aMMsLoading, error, chainId, signer]);

  useEffect(() => {
    if (!aMM || !aMM.signer || !chainId || aMMsLoading) {
      return;
    }

    void dispatch(getWalletBalanceThunk());
    void dispatch(getUnderlyingTokenAllowanceThunk({ chainId }));
  }, [dispatch, aMM, aMMsLoading, aMM?.signer, chainId]);

  useEffect(() => {
    if (!position) {
      return;
    }

    void dispatch(getInfoPostSwapThunk());
  }, [dispatch, position]);

  return {
    aMM,
    loading:
      idle ||
      positionFetchingStatus === 'idle' ||
      poolSwapInfoStatus === 'idle' ||
      loading ||
      positionFetchingStatus === 'pending' ||
      poolSwapInfoStatus === 'pending',
    noAMMFound: !aMM && !loading,
    error: error || positionFetchingStatus === 'error' || poolSwapInfoStatus === 'error',
  };
};
