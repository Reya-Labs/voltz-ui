import React from 'react';

import { Loading } from '../../../components/atomic/Loading/Loading';
import { Panel } from '../../../components/atomic/Panel/Panel';
import { useWallet } from '../../../hooks/useWallet';
import { useLPVaults } from '../../LPOptimisers/useLPVaults';
import { Header } from './Header/Header';
import { LPOptimisersTypography, OptimisersBox } from './Optimisers.styled';
import { VaultListItem } from './VaultListItem/VaultListItem';

export const Optimisers: React.FunctionComponent = () => {
  const { signer } = useWallet();
  const { lpVaults, vaultsInitialised, vaultsInitialisedWithSigner } = useLPVaults(signer);

  if (!signer || !vaultsInitialised || !vaultsInitialisedWithSigner) {
    return (
      <OptimisersBox>
        <Panel sx={{ width: '100%' }} variant="grey-dashed">
          <Loading sx={{ margin: '0 auto' }} />
        </Panel>
      </OptimisersBox>
    );
  }
  return (
    <OptimisersBox>
      <LPOptimisersTypography>LP OPTIMISERS</LPOptimisersTypography>
      <Header />
      {lpVaults
        .filter((vault) => vault.userDeposit > 0)
        .map((vault) => (
          <VaultListItem
            key={vault.id}
            depositable={vault.depositable}
            id={vault.id}
            token={vault.metadata.token}
            totalApy={0}
            totalBalance={vault.userDeposit}
            vaults={vault.metadata.vaults.map((vVaults, vaultIndex) => ({
              maturityTimestampMS: vVaults.maturityTimestampMS,
              isCompleted: vault.withdrawable(vaultIndex),
              poolsCount: vVaults.pools.length,
              currentBalance: vault.userIndividualCommittedDeposits[vaultIndex],
              distribution: vVaults.weight,
            }))}
          />
        ))}
    </OptimisersBox>
  );
};
