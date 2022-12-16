import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ConnectWallet } from '../../../components/composite/ConnectWallet/ConnectWallet';
import { useWallet } from '../../../hooks/useWallet';
import { setPageTitle } from '../../../utilities/page';
import { useLPVaults } from '../useLPVaults';
import { NoVaultFound } from './NoVaultFound/NoVaultFound';
import { VaultDepositForm } from './VaultDepositForm/VaultDepositForm';
import { VaultFormBox } from './VaultFormRoute.styled';
import { VaultWithdrawRolloverForm } from './VaultWithdrawRolloverForm/VaultWithdrawRolloverForm';

export const VaultFormRoute: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const { vaultId, actions } = useParams();
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

  if (actions !== 'manage' && actions !== 'deposit') {
    return <NoVaultFound />;
  }

  return (
    <VaultFormBox>
      {actions === 'deposit' ? (
        <VaultDepositForm loading={loading} vault={currentVault} onGoBack={handleGoBack} />
      ) : (
        <VaultWithdrawRolloverForm loading={loading} vault={currentVault} onGoBack={handleGoBack} />
      )}
    </VaultFormBox>
  );
};
