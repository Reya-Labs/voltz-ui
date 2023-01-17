import React, { useState } from 'react';

import { Loading } from '../../../components/atomic/Loading/Loading';
import { Panel } from '../../../components/atomic/Panel/Panel';
import { AutomaticRolloverToggleProps } from '../../../components/interface/AutomaticRolloverToggle/AutomaticRolloverToggle';
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
  // TODO: remove this once the entire state is lifted to Redux properly,
  // What is missing it Redux to give us some plain objects and not SDK classes
  const [forcedRerenderCounter, setForcedRerenderCounter] = useState<number>(0);
  if (!signer || !vaultsInitialised || !vaultsInitialisedWithSigner) {
    return (
      <OptimisersBox>
        <Panel sx={{ width: '100%' }} variant="grey-dashed">
          <Loading />
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
  const automaticRolloverChangePromise = async (
    vaultId: string,
    value: AutomaticRolloverToggleProps['automaticRolloverState'],
  ) => {
    try {
      const vault = lpVaults.find((v) => v.id === vaultId);
      if (!vault) {
        return;
      }
      const registration = value === 'active';
      await vault.registerForAutoRollover(registration);
      setForcedRerenderCounter(forcedRerenderCounter + 1);
    } catch (err) {
      if (typeof err === 'string') {
        throw new Error(err);
      }
      throw new Error((err as Error).message || 'Unknown!');
    }
  };

  return (
    <OptimisersBox>
      <LPOptimisersTypography>LP OPTIMISERS</LPOptimisersTypography>
      <Header />
      {vaultsWithDeposit.map((vault) => (
        <VaultListItem
          key={vault.id}
          automaticRolloverState={
            Boolean(vault.isRegisteredForAutoRollover) ? 'active' : 'inactive'
          }
          depositable={vault.depositable}
          gasCost={vault.autoRolloverRegistrationGasFeeUSD}
          id={vault.id}
          token={vault.metadata.token}
          totalBalance={vault.userDeposit}
          vaults={vault.metadata.vaults.map((vVaults, vaultIndex) => ({
            maturityTimestampMS: vVaults.maturityTimestampMS,
            isCompleted: vault.withdrawable(vaultIndex),
            poolsCount: vVaults.pools.length,
            currentBalance: vault.userIndividualDeposits[vaultIndex],
            distribution: vVaults.weight,
          }))}
          onChangeAutomaticRolloverStatePromise={automaticRolloverChangePromise}
        />
      ))}
    </OptimisersBox>
  );
};
