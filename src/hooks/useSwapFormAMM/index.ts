import { AMM } from '@voltz-protocol/v1-sdk';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { selectSwapFormAMM, setSwapFormAMMAction } from '../../app/features/swap-form';
import {
  getAvailableNotionalsThunk,
  getFixedRateThunk,
  getVariableRateThunk,
} from '../../app/features/swap-form/thunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { generateAmmIdForRoute, generatePoolId } from '../../utilities/amm';
import { useAMMs } from '../useAMMs';

export type UseAMMsResult = {
  aMM: AMM | null;
  loading: boolean;
  error: boolean;
  idle: boolean;
};

export const useSwapFormAMM = (): UseAMMsResult => {
  const { ammId, poolId } = useParams();
  const { aMMs, loading, error, idle } = useAMMs();
  const aMM = useAppSelector(selectSwapFormAMM);
  const dispatch = useAppDispatch();

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
    if (foundAMM) {
      dispatch(
        setSwapFormAMMAction({
          amm: foundAMM,
        }),
      );
    }
  }, [dispatch, ammId, poolId, aMMs, loading, error]);

  useEffect(() => {
    if (!aMM) {
      return;
    }

    void dispatch(getFixedRateThunk());
    void dispatch(getVariableRateThunk());
    void dispatch(getAvailableNotionalsThunk());
  }, [dispatch, aMM]);

  return {
    aMM,
    loading,
    idle,
    error,
  };
};
