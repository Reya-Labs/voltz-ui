import { AMM } from '@voltz-protocol/v1-sdk';
import { useEffect } from 'react';

import { initialiseAMMsThunk, setSignerAction } from '../../store/features/aMMs';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useWallet } from '../useWallet';

export type UseStoreAMMsResult = {
  aMMs: AMM[];
  loading: boolean;
  error: boolean;
};

export const useStoreAMMs = (traderPools: boolean): UseStoreAMMsResult => {
  const { signer } = useWallet();
  const dispatch = useAppDispatch();
  const aMMsLoadedState = useAppSelector((state) => state.aMMs.aMMsLoadedState);
  const aMMs = useAppSelector((state) => state.aMMs.aMMs);

  useEffect(() => {
    void dispatch(
      initialiseAMMsThunk({
        trader: traderPools,
      }),
    );
  }, [dispatch, traderPools]);

  useEffect(() => {
    void dispatch(
      setSignerAction({
        signer,
      }),
    );
  }, [dispatch, signer]);

  return {
    aMMs: aMMs,
    loading: aMMsLoadedState === 'pending',
    error: aMMsLoadedState === 'failed',
  };
};
