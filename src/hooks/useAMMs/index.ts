import { AMM, BorrowAMM } from '@voltz-protocol/v1-sdk';
import { useEffect } from 'react';

import {
  initialiseAMMsThunk,
  selectAMMs,
  selectAMMsLoadedState,
  selectBorrowAMMs,
  selectTraderAMMs,
  setSignerForAMMsAction,
} from '../../app/features/aMMs';
import { selectChainId } from '../../app/features/network';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useWallet } from '../useWallet';

export type UseAMMsResult = {
  aMMs: AMM[];
  traderAMMs: AMM[];
  borrowAMMs: BorrowAMM[];
  loading: boolean;
  error: boolean;
  idle: boolean;
};

export const useAMMs = (): UseAMMsResult => {
  const { signer } = useWallet();

  const dispatch = useAppDispatch();
  const chainId = useAppSelector(selectChainId);
  const aMMsLoadedState = useAppSelector(selectAMMsLoadedState);
  const aMMs = useAppSelector(selectAMMs);
  const traderAMMs = useAppSelector(selectTraderAMMs);
  const borrowAMMs = useAppSelector(selectBorrowAMMs);

  useEffect(() => {
    if (!chainId) {
      return;
    }
    // only fetch aMMs once per network
    if (aMMsLoadedState !== 'idle') {
      return;
    }
    void dispatch(
      initialiseAMMsThunk({
        chainId,
      }),
    );
  }, [chainId, aMMsLoadedState, dispatch]);

  useEffect(() => {
    if (!chainId) {
      return;
    }
    if (aMMsLoadedState !== 'succeeded') {
      return;
    }

    void dispatch(
      setSignerForAMMsAction({
        signer,
        chainId,
      }),
    );
  }, [chainId, aMMsLoadedState, dispatch, signer]);

  return {
    aMMs,
    traderAMMs,
    borrowAMMs,
    idle: aMMsLoadedState === 'idle',
    loading: aMMsLoadedState === 'pending',
    error: aMMsLoadedState === 'failed',
  };
};
