import { Page } from '@components/interface';

import ConnectedMellowLpDepositForm from './ConnectedMellowLpDepositForm/ConnectedMellowLpDepositForm';
import ConnectedMellowLPTable from './ConnectedMellowLPTable/ConnectedMellowLPTable';
import { setPageTitle } from '@utilities';
import { useEffect, useState } from 'react';
import { isNull } from 'lodash';
import { useMellowLPVaults, useWallet } from '@hooks';
import { useLocation } from 'react-router-dom';

import { MellowProduct } from './types';
import { Box, SystemStyleObject, Theme } from '@mui/system';

export enum EcosystemRenderMode {
  MELLOW_DEPOSIT_FORM,
  PAGE,
}

const Ecosystem: React.FunctionComponent = () => {
  const wallet = useWallet();

  const [renderMode, setRenderMode] = useState<EcosystemRenderMode>(EcosystemRenderMode.PAGE);
  const [currentVault, setCurrentVault] = useState<MellowProduct>();
  const location = useLocation();

  const handleSelectMellowLpVault = (selectedVault: MellowProduct) => {
    if (isNull(wallet.account)) {
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
        setPageTitle('Ecosystem Page');
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

  const lpVaults = useMellowLPVaults();

  const { signer } = useWallet();
  const isSignerAvailable = !isNull(signer);

  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [vaultsLoaded, setVaultsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (lpVaults) {
      setVaultsLoaded(false);
      setDataLoading(true);
      const request = Promise.allSettled(lpVaults.map((item) => item.vault.vaultInit()));

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

  const boxStyles: SystemStyleObject<Theme> = {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    backdropFilter: 'blur(8px)',
  };

  useEffect(() => {
    if (lpVaults && isSignerAvailable && vaultsLoaded) {
      setDataLoading(true);

      const request = Promise.allSettled(lpVaults.map((item) => item.vault.userInit(signer)));

      void request.then(
        (_) => {
          setDataLoading(false);
        },
        (_) => {
          setDataLoading(false);
        },
      );
    }
  }, [lpVaults, isSignerAvailable, vaultsLoaded]);

  return (
    <Page>
      {renderMode === EcosystemRenderMode.PAGE && (
        <Box sx={boxStyles}>
          <ConnectedMellowLPTable
            lpVaults={lpVaults}
            dataLoading={dataLoading}
            onSelectItem={handleSelectMellowLpVault}
          />
        </Box>
      )}

      {renderMode === EcosystemRenderMode.MELLOW_DEPOSIT_FORM && (
        <Box sx={boxStyles}>
          {currentVault && (
            <ConnectedMellowLpDepositForm onReset={handleReset} vault={currentVault} />
          )}
        </Box>
      )}
    </Page>
  );
};

export default Ecosystem;
