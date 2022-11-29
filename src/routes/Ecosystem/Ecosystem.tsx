import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useMellowLPVaults } from '../../hooks/useMellowLPVaults/useMellowLPVaults';
import { useWallet } from '../../hooks/useWallet';
import { setPageTitle } from '../../utilities/page';
import { routes } from '../paths';
import { ConnectedMellowLpDepositForm } from './ConnectedMellowLpDepositForm/ConnectedMellowLpDepositForm';
import ConnectedMellowLPTable from './ConnectedMellowLPTable/ConnectedMellowLPTable';
import { ConnectedMellowBox } from './Ecosystem.styled';
import { MellowProduct } from './types';

export enum EcosystemRenderMode {
  MELLOW_DEPOSIT_FORM,
  PAGE,
}

export const Ecosystem: React.FunctionComponent = () => {
  const wallet = useWallet();

  const [renderMode, setRenderMode] = useState<EcosystemRenderMode>(EcosystemRenderMode.PAGE);
  const [currentVault, setCurrentVault] = useState<MellowProduct>();
  const location = useLocation();
  const navigate = useNavigate();
  const lpVaults = useMellowLPVaults();

  const { signer } = useWallet();

  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [vaultsLoaded, setVaultsLoaded] = useState<boolean>(false);

  const handleGoBack = () => {
    handleReset();
    navigate(`/${routes.LP_OPTIMISERS}`);
  };

  const handleSelectMellowLpVault = (selectedVault: MellowProduct) => {
    if (!wallet.account) {
      wallet.setRequired(true);
    } else {
      setRenderMode(EcosystemRenderMode.MELLOW_DEPOSIT_FORM);
      setCurrentVault(selectedVault);
    }
  };

  const handleReset = () => {
    setRenderMode(EcosystemRenderMode.PAGE);
    setCurrentVault(undefined);
  };

  useEffect(() => {
    handleReset();
  }, []);

  useEffect(() => {
    setCurrentVault(undefined);
  }, [setCurrentVault]);

  useEffect(() => {
    switch (renderMode) {
      case EcosystemRenderMode.MELLOW_DEPOSIT_FORM: {
        setPageTitle('Deposit Form');
        break;
      }
      case EcosystemRenderMode.PAGE: {
        setPageTitle('LP Optimisers');
        break;
      }
    }
  }, [setPageTitle, renderMode]);

  useEffect(() => {
    if (renderMode === EcosystemRenderMode.PAGE) {
      return;
    }
    handleReset();
  }, [location.key]);

  useEffect(() => {
    if (lpVaults) {
      setVaultsLoaded(false);
      setDataLoading(true);
      const request = Promise.allSettled(
        lpVaults.filter((item) => !item.metadata.soon).map((item) => item.vault.vaultInit()),
      );

      void request.then(
        (_) => {
          setVaultsLoaded(true);
          setDataLoading(false);
        },
        (_) => {
          setDataLoading(false);
        },
      );
    }
  }, [lpVaults]);

  useEffect(() => {
    if (lpVaults && signer && vaultsLoaded) {
      setDataLoading(true);

      const request = Promise.allSettled(
        lpVaults.filter((item) => !item.metadata.soon).map((item) => item.vault.userInit(signer)),
      );

      void request.then(
        (_) => {
          setDataLoading(false);
        },
        (_) => {
          setDataLoading(false);
        },
      );
    }
  }, [lpVaults, signer, vaultsLoaded]);

  return (
    <>
      {renderMode === EcosystemRenderMode.PAGE && (
        <ConnectedMellowBox>
          <ConnectedMellowLPTable
            dataLoading={dataLoading}
            lpVaults={lpVaults}
            onSelectItem={handleSelectMellowLpVault}
          />
        </ConnectedMellowBox>
      )}

      {renderMode === EcosystemRenderMode.MELLOW_DEPOSIT_FORM && (
        <ConnectedMellowBox>
          {currentVault && (
            <ConnectedMellowLpDepositForm vault={currentVault} onCancel={handleGoBack} />
          )}
        </ConnectedMellowBox>
      )}
    </>
  );
};
