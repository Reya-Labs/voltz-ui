import React, { useState } from 'react';

import { Loading } from '../../../components/atomic/Loading/Loading';
import { Panel } from '../../../components/atomic/Panel/Panel';
import { useWallet } from '../../../hooks/useWallet';
import { useLPVaults } from '../../LPOptimisers/useLPVaults';
import { routes } from '../../paths';
import { NoPositionsOrVaultsFound } from '../NoPositionsOrVaultsFound/NoPositionsOrVaultsFound';
import { Header } from './Header/Header';
import { LPOptimisersTypography, OptimisersBox } from './Optimisers.styled';
import { VaultListItem } from './VaultListItem/VaultListItem';

export const Optimisers: React.FunctionComponent = () => {
  const { signer } = useWallet();
  const { lpVaults, vaultsInitialised, vaultsInitialisedWithSigner } = useLPVaults(signer);
  // todo: read the value from SDK
  const [automaticRolloverState, setAutomaticRolloverState] = useState<'active' | 'inactive'>(
    'inactive',
  );
  const [automaticRolloverStatus, setAutomaticRolloverStatus] = useState<string>(
    'Waiting for confirmation...',
  );
  if (!signer || !vaultsInitialised || !vaultsInitialisedWithSigner) {
    return (
      <OptimisersBox>
        <Panel sx={{ width: '100%' }} variant="grey-dashed">
          <Loading sx={{ margin: '0 auto' }} />
        </Panel>
      </OptimisersBox>
    );
  }

  const vaultsWithDeposit = lpVaults.filter((vault) => vault.userDeposit > 0);

  if (vaultsWithDeposit.length === 0) {
    return (
      <OptimisersBox>
        <NoPositionsOrVaultsFound
          description="Open your first position here:"
          navigateTo={`/${routes.LP_OPTIMISERS}`}
          navigateToText="LP OPTIMISERS"
          title="You haven’t provided liquidity to any Optimiser yet."
        />
      </OptimisersBox>
    );
  }

  return (
    <OptimisersBox>
      <LPOptimisersTypography>LP OPTIMISERS</LPOptimisersTypography>
      <Header />
      {vaultsWithDeposit.map((vault) => (
        <VaultListItem
          key={vault.id}
          automaticRolloverState={automaticRolloverState}
          automaticRolloverStatus={automaticRolloverStatus}
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
          onChangeAutomaticRolloverState={(id, value) => {
            setAutomaticRolloverState(value);
            setAutomaticRolloverStatus('Todo: finish SDK integration');
          }}
        />
      ))}
    </OptimisersBox>
  );
};
