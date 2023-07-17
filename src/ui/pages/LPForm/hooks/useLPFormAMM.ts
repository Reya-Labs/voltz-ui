import { AMM } from '@voltz-protocol/v1-sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  selectLpFormAMM,
  selectLpFormPositionsFetchingStatus,
  selectPoolLpInfoStatus,
  setLpFormAMMAction,
} from '../../../../app/features/forms/lps/lp';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useAMMs } from '../../../../hooks/useAMMs';
import { generateAmmIdForRoute, generatePoolId } from '../../../../utilities/amm';
import { useGetInfoPostLP } from './useGetInfoPostLP';
import { useGetPoolLpInfo } from './useGetPoolLpInfo';
import { useGetWalletBalanceAndUnderlyingTokenAllowance } from './useGetWalletBalanceAndUnderlyingTokenAllowance';
import { useLPFormOpened } from './useLPFormOpened';
import { useSetSignerAndGetPositionsForLP } from './useSetSignerAndGetPositionsForLP';

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

  const [loading, setLoading] = useState(true);

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

  useGetPoolLpInfo();
  useSetSignerAndGetPositionsForLP();
  useLPFormOpened();
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
