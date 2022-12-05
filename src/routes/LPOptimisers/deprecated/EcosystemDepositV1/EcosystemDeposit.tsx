import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useWallet } from '../../../../hooks/useWallet';
import { setPageTitle } from '../../../../utilities/page';
import { routes } from '../../../paths';
import { useLPVaults } from '../../useLPVaults';
import { ConnectedMellowLpDepositForm } from './ConnectedMellowLpDepositForm/ConnectedMellowLpDepositForm';
import { ConnectWallet } from './ConnectWallet/ConnectWallet';
import { ConnectedMellowBox } from './EcosystemDeposit.styled';
import { NoVaultFound } from './NoVaultFound/NoVaultFound';

export const EcosystemDepositDeprecated: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(`/${routes.LP_OPTIMISERS}`);
  const { vaultId } = useParams();
  const { signer } = useWallet();
  const { lpVaults, vaultsInitialised, vaultsInitialisedWithSigner } = useLPVaults(signer);
  const currentVault = lpVaults.find((v) => v.id === vaultId);

  const loading = !vaultsInitialised || !vaultsInitialisedWithSigner;
  useEffect(() => {
    setPageTitle('Deposit Form');
  }, []);

  if (!signer) {
    return <ConnectWallet />;
  }

  if (!currentVault) {
    return <NoVaultFound />;
  }

  return (
    <ConnectedMellowBox>
      <ConnectedMellowLpDepositForm
        loading={loading}
        vault={currentVault}
        onCancel={handleGoBack}
      />
    </ConnectedMellowBox>
  );
};
