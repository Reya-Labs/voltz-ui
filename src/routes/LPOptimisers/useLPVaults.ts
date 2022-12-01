import { providers } from 'ethers';
import { useEffect } from 'react';

import {
  initialiseVaultsForSignerThunk,
  initialiseVaultsThunk,
  resetVaultsAction,
} from '../../store/features/ecosystem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const useLPVaults = (signer: providers.JsonRpcSigner | null) => {
  const vaultsLoaded = useAppSelector((state) => state.ecosystem.vaultsLoadedState);
  const signerLoadedState = useAppSelector((state) => state.ecosystem.signerLoadedState);
  const shouldInitVaults = vaultsLoaded === 'idle';
  const vaultsInitialised = vaultsLoaded === 'succeeded';
  const vaultsInitialisedWithSigner = signerLoadedState === 'succeeded';
  const lpVaults = useAppSelector((state) => state.ecosystem.lpVaults);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!shouldInitVaults) {
      return;
    }
    void dispatch(initialiseVaultsThunk());
  }, [shouldInitVaults]);

  useEffect(() => {
    if (!signer) {
      dispatch(resetVaultsAction());
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
