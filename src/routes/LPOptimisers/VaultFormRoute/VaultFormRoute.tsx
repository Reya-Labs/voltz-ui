import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Loading } from '../../../components/atomic/Loading/Loading';
import { Panel } from '../../../components/atomic/Panel/Panel';
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
  const { vaultId, actions, vaultIndex } = useParams();
  const { signer } = useWallet();
  const { lpVaults, vaultsLoaded } = useLPVaults();
  const currentVault = lpVaults.find((v) => v.optimiserId === vaultId);

  const loading = !vaultsLoaded;
  useEffect(() => {
    setPageTitle(actions === 'deposit' ? 'Deposit Form' : 'Rollover/Withdraw Form');
  }, [actions]);

  if (!signer) {
    return (
      <ConnectWallet
        connectWalletText="CONNECT YOUR WALLET"
        heading="🚫 RESTRICTED"
        subheading="Your wallet needs to be connected before proceeding."
      />
    );
  }

  if (loading) {
    return (
      <Panel
        sx={{
          width: '400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
        }}
        variant="grey-dashed"
      >
        <Loading />
      </Panel>
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
