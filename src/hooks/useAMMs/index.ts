import { AMM } from '@voltz-protocol/v1-sdk';
import { useEffect } from 'react';

import {
  initialiseAMMsThunk,
  selectAMMs,
  selectAMMsLoadedState,
  selectTraderAMMs,
  setSignerForAMMsAction,
} from '../../app/features/aMMs';
import { selectChainId } from '../../app/features/network';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useWallet } from '../useWallet';

type UseAMMsResult = {
  aMMs: AMM[];
  traderAMMs: AMM[];
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

  useEffect(() => {
    // only fetch aMMs once per network
    if (aMMsLoadedState !== 'idle') {
      return;
    }
    void dispatch(
      initialiseAMMsThunk({
        // todo: add proper chain ids
        chainIds: [1, 42161],
      }),
    );
  }, [aMMsLoadedState, dispatch]);

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
    idle: aMMsLoadedState === 'idle',
    loading: aMMsLoadedState === 'pending',
    error: aMMsLoadedState === 'failed',
  };
};
