import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ConnectWallet } from '../../../components/composite/ConnectWallet/ConnectWallet';
import { useWallet } from '../../../hooks/useWallet';
import { setPageTitle } from '../../../utilities/page';
import { useLPVaults } from '../useLPVaults';
import { ConnectedDepositForm } from './ConnectedDepositForm/ConnectedDepositForm';
import { ConnectedMellowBox } from './EcosystemDeposit.styled';
import { NoVaultFound } from './NoVaultFound/NoVaultFound';

export const EcosystemDeposit: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const { vaultId } = useParams();
  const { signer } = useWallet();
  const { lpVaults, vaultsInitialised, vaultsInitialisedWithSigner } = useLPVaults(signer);
  const currentVault = lpVaults.find((v) => v.id === vaultId);

  const loading = !vaultsInitialised || !vaultsInitialisedWithSigner;
  useEffect(() => {
    setPageTitle('Deposit Form');
  }, []);

  if (!signer) {
    return (
      <ConnectWallet
        connectWalletText="CONNECT YOUR WALLET"
        heading="🚫 RESTRICTED"
        subheading="Your wallet needs to be connected before proceeding."
      />
    );
  }

  if (!currentVault) {
    return <NoVaultFound />;
  }

  return (
    <ConnectedMellowBox>
      <ConnectedDepositForm loading={loading} vault={currentVault} onCancel={handleGoBack} />
    </ConnectedMellowBox>
  );
};
