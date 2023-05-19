import { registerForAutoRollover } from '@voltz-protocol/v1-sdk';
import React, { useState } from 'react';

import { updateOptimiserStateAction } from '../../../app/features/lp-optimisers';
import { selectChainId } from '../../../app/features/network';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Loading } from '../../../components/atomic/Loading/Loading';
import { Panel } from '../../../components/atomic/Panel/Panel';
import { AutomaticRolloverToggleProps } from '../../../components/interface/AutomaticRolloverToggle/AutomaticRolloverToggle';
import { useWallet } from '../../../hooks/useWallet';
import { getAlchemyKey } from '../../../utilities/getAlchemyKey';
import { getInfuraKey } from '../../../utilities/getInfuraKey';
import { useLPVaults } from '../../LPOptimisers/useLPVaults';
import { routes } from '../../paths';
import { NoPositionsOrVaultsFound } from '../NoPositionsOrVaultsFound/NoPositionsOrVaultsFound';
import { Header } from './Header/Header';
import { LPOptimisersTypography, OptimisersBox } from './Optimisers.styled';
import { VaultListItem } from './VaultListItem/VaultListItem';

export const Optimisers: React.FunctionComponent = () => {
  const { signer } = useWallet();
  const dispatch = useAppDispatch();
  const chainId = useAppSelector(selectChainId);

  const { lpVaults, vaultsLoaded } = useLPVaults('all');
  // TODO: remove this once the entire state is lifted to Redux properly,
  // What is missing it Redux to give us some plain objects and not SDK classes
  const [forcedRerenderCounter, setForcedRerenderCounter] = useState<number>(0);
  if (!signer || !vaultsLoaded || !chainId) {
    return (
      <OptimisersBox>
        <Panel sx={{ width: '100%' }} variant="grey-dashed">
          <Loading />
        </Panel>
      </OptimisersBox>
    );
  }

  const vaultsWithDeposit = lpVaults.filter((vault) => vault.userOptimiserDeposit > 0);

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
      const vault = lpVaults.find((v) => v.optimiserId === vaultId);
      if (!vault) {
        return;
      }
      const registration = value === 'active';
      await registerForAutoRollover({
        optimiserId: vault.optimiserId,
        registration,
        signer,
        chainId,
        alchemyApiKey: getAlchemyKey(),
        infuraApiKey: getInfuraKey(),
      }).then(({ newOptimiserState }) => {
        if (newOptimiserState) {
          void dispatch(
            updateOptimiserStateAction({
              optimiserId: vault.optimiserId,
              newOptimiserState,
              chainId,
            }),
          );
        }
      });
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
          key={vault.optimiserId}
          automaticRolloverState={
            Boolean(vault.isUserRegisteredForAutoRollover) ? 'active' : 'inactive'
          }
          canRegisterUnregister={vault.canRegisterUnregister}
          depositable={vault.depositable}
          gasCost={vault.autorolloverGasCostInUSD}
          id={vault.optimiserId}
          token={vault.tokenName}
          totalBalance={vault.userOptimiserDeposit}
          vaults={vault.vaults.map((vVaults) => ({
            maturityTimestampMS: vVaults.maturityTimestampMS,
            isCompleted: vVaults.withdrawable,
            poolsCount: vVaults.pools.length,
            currentBalance: vVaults.userVaultDeposit,
            distribution: vVaults.defaultWeight,
            canManageVaultPosition: vVaults.canUserManageVault,
          }))}
          onChangeAutomaticRolloverStatePromise={automaticRolloverChangePromise}
        />
      ))}
    </OptimisersBox>
  );
};
