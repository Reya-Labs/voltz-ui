import { RainbowLoader } from 'brokoli-ui';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useLPVaults } from '../../../hooks/useLPVaults';
import { useWallet } from '../../../hooks/useWallet';
import { ConnectWallet } from '../../components/ConnectWallet';
import { RainbowLoaderBox } from '../LPOptimisers/Vaults/VaultsTable/VaultsTable.styled';
import { NoVaultFound } from './NoVaultFound/NoVaultFound';
import { VaultDepositForm } from './VaultDepositForm/VaultDepositForm';
import { VaultFormBox } from './VaultFormRoute.styled';
import { VaultWithdrawRolloverForm } from './VaultWithdrawRolloverForm/VaultWithdrawRolloverForm';

export const VaultFormRoute: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const { vaultId, actions, vaultIndex } = useParams();
  const { signer } = useWallet();
  const { lpVaults, vaultsLoaded } = useLPVaults();
  const currentVault = lpVaults.find((v) => v.optimiserId === vaultId);

  const loading = !vaultsLoaded;

  if (!signer) {
    return <ConnectWallet heading="Welcome!" subheading="Please connect your wallet" />;
  }

  if (loading) {
    return (
      <VaultFormBox>
        <RainbowLoaderBox>
          <RainbowLoader height={2} text={'Loading Optimiser Information...'} />
        </RainbowLoaderBox>
      </VaultFormBox>
    );
  }

  if (!currentVault) {
    return <NoVaultFound />;
  }

  if (actions !== 'manage' && actions !== 'deposit') {
    return <NoVaultFound />;
  }
  const vaultIndexParsed = vaultIndex === undefined ? undefined : parseInt(vaultIndex, 10);

  if (actions === 'manage' && isNaN(vaultIndexParsed as number)) {
    return <NoVaultFound />;
  }

  return (
    <VaultFormBox>
      {actions === 'deposit' ? (
        <VaultDepositForm loading={loading} vault={currentVault} onGoBack={handleGoBack} />
      ) : (
        <VaultWithdrawRolloverForm
          loading={loading}
          vault={currentVault}
          vaultIndex={vaultIndexParsed as number}
          onGoBack={handleGoBack}
        />
      )}
    </VaultFormBox>
  );
};
