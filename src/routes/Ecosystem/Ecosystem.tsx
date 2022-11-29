import React, { useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import { useWallet } from '../../hooks/useWallet';
import { userInitThunk, vaultInitThunk } from '../../store/features/ecosystem';
import { MellowProduct } from '../../store/features/ecosystem/getMellowLPVaults/config';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPageTitle } from '../../utilities/page';
import { routes } from '../paths';
import ConnectedMellowLPTable from './ConnectedMellowLPTable/ConnectedMellowLPTable';
import { ConnectedMellowBox } from './Ecosystem.styled';

export const Ecosystem: React.FunctionComponent = () => {
  const wallet = useWallet();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { signer } = useWallet();
  const vaultsLoaded = useAppSelector((state) => state.ecosystem.vaultsLoadedState);
  const lpVaults = useAppSelector((state) => state.ecosystem.lpVaults);
  const handleSelectMellowLpVault = (selectedVault: MellowProduct) => {
    if (!wallet.account) {
      wallet.setRequired(true);
    } else {
      const path = generatePath(routes.LP_OPTIMISERS_DEPOSIT, { vaultId: selectedVault.id });
      navigate(`/${path}`);
    }
  };

  useEffect(() => {
    setPageTitle('LP Optimisers');
    void dispatch(vaultInitThunk());
  }, []);

  useEffect(() => {
    if (vaultsLoaded !== 'succeeded') {
      return;
    }
    // todo: Costin can we unload vaults if user logs out?
    if (!signer) {
      return;
    }
    void dispatch(
      userInitThunk({
        signer,
      }),
    );
  }, [signer, vaultsLoaded]);

  return (
    <ConnectedMellowBox>
      <ConnectedMellowLPTable
        dataLoading={vaultsLoaded !== 'succeeded'}
        lpVaults={lpVaults}
        onSelectItem={handleSelectMellowLpVault}
      />
    </ConnectedMellowBox>
  );
};
