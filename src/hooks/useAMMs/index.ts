import { AMM, BorrowAMM } from '@voltz-protocol/v1-sdk';
import { useEffect } from 'react';

import {
  initialiseAMMsThunk,
  selectAMMs,
  selectBorrowAMMs,
  selectTraderAMMs,
  setSignerForAMMsAction,
} from '../../app/features/aMMs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useWallet } from '../useWallet';

export type UseAMMsResult = {
  aMMs: AMM[];
  traderAMMs: AMM[];
  borrowAMMs: BorrowAMM[];
  loading: boolean;
  error: boolean;
};

export const useAMMs = (): UseAMMsResult => {
  const { signer } = useWallet();
  const dispatch = useAppDispatch();
  const aMMsLoadedState = useAppSelector((state) => state.aMMs.aMMsLoadedState);
  const aMMs = useAppSelector(selectAMMs);
  const traderAMMs = useAppSelector(selectTraderAMMs);
  const borrowAMMs = useAppSelector(selectBorrowAMMs);

  useEffect(() => {
    // only fetch aMMs once
    if (aMMsLoadedState !== 'idle') {
      return;
    }
    void dispatch(initialiseAMMsThunk());
  }, [aMMsLoadedState, dispatch]);

  useEffect(() => {
    if (aMMsLoadedState !== 'succeeded') {
      return;
    }

    void dispatch(
      setSignerForAMMsAction({
        signer,
      }),
    );
  }, [aMMsLoadedState, dispatch, signer]);

  return {
    aMMs,
    traderAMMs,
    borrowAMMs,
    loading: aMMsLoadedState === 'pending',
    error: aMMsLoadedState === 'failed',
  };
};
