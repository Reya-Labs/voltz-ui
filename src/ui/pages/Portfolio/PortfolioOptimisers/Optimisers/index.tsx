import { registerForAutoRollover } from '@voltz-protocol/v1-sdk';
import { MarketTokenProps, Typography } from 'brokoli-ui';
import React, { useState } from 'react';

import { updateOptimiserStateAction } from '../../../../../app/features/lp-optimisers';
import { selectChainId } from '../../../../../app/features/network';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { AutomaticRolloverToggleProps } from '../../../../../components/interface/AutomaticRolloverToggle/AutomaticRolloverToggle';
import { useWallet } from '../../../../../hooks/useWallet';
import { useLPVaults } from '../../../../../routes/LPOptimisers/useLPVaults';
import { routes } from '../../../../../routes/paths';
import { getAlchemyKey } from '../../../../../utilities/getAlchemyKey';
import { getInfuraKey } from '../../../../../utilities/getInfuraKey';
import { ConnectWallet } from '../../../../components/ConnectWallet';
import { NoVaultsFound } from '../NoVaultsFound';
import { Header } from './Header';
import { OptimisersBox } from './Optimisers.styled';
import { VaultListItem } from './VaultListItem';

export const Optimisers: React.FunctionComponent = () => {
  const { signer } = useWallet();
  const dispatch = useAppDispatch();
  const chainId = useAppSelector(selectChainId);
  const { lpVaults, vaultsLoaded } = useLPVaults('all');
  // TODO: remove this once the entire state is lifted to Redux properly,
  // What is missing it Redux to give us some plain objects and not SDK classes
  const [forcedRerenderCounter, setForcedRerenderCounter] = useState<number>(0);

  if (!chainId) {
    return null;
  }

  if (!signer) {
    return (
      <ConnectWallet
        heading="Welcome to the your Portfolio"
        subheading="Please connect your wallet"
      />
    );
  }

  if (!vaultsLoaded) {
    return null;
  }

  const vaultsWithDeposit = lpVaults.filter((vault) => vault.userOptimiserDeposit > 0);

  if (vaultsWithDeposit.length === 0) {
    return (
      <OptimisersBox>
        <NoVaultsFound
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
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodyMediumBold">
        Optimisers
      </Typography>
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
          token={vault.tokenName.toLowerCase() as MarketTokenProps['token']}
          totalBalance={vault.userOptimiserDepositUSD}
          vaults={vault.vaults.map((vVaults) => ({
            maturityTimestampMS: vVaults.maturityTimestampMS,
            isCompleted: vVaults.withdrawable,
            poolsCount: vVaults.pools.length,
            currentBalance: vVaults.userVaultDepositUSD,
            distribution: vVaults.defaultWeight,
            canManageVaultPosition: vVaults.canUserManageVault,
          }))}
          onChangeAutomaticRolloverStatePromise={automaticRolloverChangePromise}
        />
      ))}
    </OptimisersBox>
  );
};
