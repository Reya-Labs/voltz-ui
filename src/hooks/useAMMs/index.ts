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
import { selectNetwork } from '../../app/features/network';
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
  const network = useAppSelector(selectNetwork);
  const aMMsLoadedState = useAppSelector(selectAMMsLoadedState);
  const aMMs = useAppSelector(selectAMMs);
  const traderAMMs = useAppSelector(selectTraderAMMs);
  const borrowAMMs = useAppSelector(selectBorrowAMMs);

  useEffect(() => {
    // only fetch aMMs once per network
    if (aMMsLoadedState !== 'idle') {
      return;
    }
    void dispatch(
      initialiseAMMsThunk({
        network,
      }),
    );
  }, [network, aMMsLoadedState, dispatch]);

  useEffect(() => {
    if (aMMsLoadedState !== 'succeeded') {
      return;
    }

    void dispatch(
      setSignerForAMMsAction({
        signer,
        network,
      }),
    );
  }, [network, aMMsLoadedState, dispatch, signer]);

  return {
    aMMs,
    traderAMMs,
    borrowAMMs,
    loading: aMMsLoadedState === 'pending',
    error: aMMsLoadedState === 'failed',
  };
};
