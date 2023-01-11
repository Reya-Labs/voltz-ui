import { providers } from 'ethers';
import { useEffect } from 'react';

import {
  initialiseVaultsForSignerThunk,
  initialiseVaultsThunk,
  resetVaultsAction,
} from '../../app/features/lp-optimisers';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const useLPVaults = (signer: providers.JsonRpcSigner | null) => {
  const vaultsLoaded = useAppSelector((state) => state.lpOptimisers.vaultsLoadedState);
  const signerLoadedState = useAppSelector((state) => state.lpOptimisers.signerLoadedState);
  const shouldInitVaults = vaultsLoaded === 'idle';
  const vaultsInitialised = vaultsLoaded === 'succeeded';
  const vaultsInitialisedWithSigner = signerLoadedState === 'succeeded';
  const lpVaults = useAppSelector((state) => state.lpOptimisers.lpVaults);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!shouldInitVaults) {
      return;
    }
    void dispatch(initialiseVaultsThunk());
  }, [shouldInitVaults]);

  useEffect(() => {
    if (!signer && vaultsInitialised) {
      dispatch(resetVaultsAction());
      return;
    }
    if (!signer) {
      return;
    }
    if (!vaultsInitialised) {
      return;
    }
    if (vaultsInitialisedWithSigner) {
      return;
    }
    void dispatch(
      initialiseVaultsForSignerThunk({
        signer,
      }),
    );
  }, [signer, vaultsInitialised, vaultsInitialisedWithSigner]);

  return {
    lpVaults,
    vaultsInitialised,
    vaultsInitialisedWithSigner,
  };
};
