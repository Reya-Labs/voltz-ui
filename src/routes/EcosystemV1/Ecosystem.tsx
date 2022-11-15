import { Page } from '@components/interface';
import Box from '@mui/material/Box';
import { Agents } from '@contexts';

import ConnectedMellowLpDepositForm from './ConnectedMellowLpDepositForm/ConnectedMellowLpDepositForm';
import ConnectedMellowLPTable from './ConnectedMellowLPTable/ConnectedMellowLPTable';
import { AugmentedMellowLpVault, setPageTitle } from '@utilities';
import { useEffect, useState } from 'react';
import { isNull } from 'lodash';
import { useWallet } from '@hooks';
import { useLocation } from 'react-router-dom';

export enum EcosystemRenderMode {
  MELLOW_DEPOSIT_FORM,
  PAGE,
}

const Ecosystem: React.FunctionComponent = () => {
  const wallet = useWallet();

  const [renderMode, setRenderMode] = useState<EcosystemRenderMode>(EcosystemRenderMode.PAGE);
  const [currentVault, setCurrentVault] = useState<AugmentedMellowLpVault>();
  const location = useLocation();

  const handleSelectMellowLpVault = (selectedVault: AugmentedMellowLpVault) => {
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

  return (
    <Page>
      {renderMode === EcosystemRenderMode.PAGE && (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}
        >
          <ConnectedMellowLPTable
            agent={Agents.LIQUIDITY_PROVIDER}
            onSelectItem={handleSelectMellowLpVault}
          />
        </Box>
      )}

      {renderMode === EcosystemRenderMode.MELLOW_DEPOSIT_FORM && (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}
        >
          {currentVault && (
            <ConnectedMellowLpDepositForm onReset={handleReset} vault={currentVault} />
          )}
        </Box>
      )}
    </Page>
  );
};

export default Ecosystem;
