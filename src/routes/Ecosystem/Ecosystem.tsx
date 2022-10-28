import { Page } from '@components/interface';
import Box from '@mui/material/Box';
import { Agents } from '@contexts';

import ConnectedMellowLpDepositForm from '../../components/containers/ConnectedMellowLpDepositForm/ConnectedMellowLpDepositForm';
import ConnectedMellowLPTable from '../../components/containers/ConnectedMellowLPTable/ConnectedMellowLPTable';
import { AugmentedMellowLpVault } from '@utilities';
import { useEffect, useState } from 'react';
import { setPageTitle } from '@utilities';
import { isNull } from 'lodash';
import { useWallet } from '@hooks';

export enum EcosystemRenderMode {
  MELLOW_DEPOSIT_FORM,
  PAGE,
}

const Ecosystem: React.FunctionComponent = () => {
  const wallet = useWallet();

  const [renderMode, setRenderMode] = useState<EcosystemRenderMode>(EcosystemRenderMode.PAGE);
  const [currentVault, setCurrentVault] = useState<AugmentedMellowLpVault>();

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
