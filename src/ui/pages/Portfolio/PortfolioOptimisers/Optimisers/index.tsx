import { registerForAutoRollover } from '@voltz-protocol/v1-sdk';
import { MarketTokenProps, Typography } from 'brokoli-ui';
import React, { useState } from 'react';

import { routes, useAppDispatch, useAppSelector } from '../../../../../app';
import { updateOptimiserStateAction } from '../../../../../app/features/lp-optimisers';
import { selectChainId } from '../../../../../app/features/network';
import { getAlchemyKey } from '../../../../../utilities/getAlchemyKey';
import { getInfuraKey } from '../../../../../utilities/getInfuraKey';
import { AutomaticRolloverToggleProps } from '../../../../components/AutomaticRolloverToggle';
import { ConnectWallet } from '../../../../components/ConnectWallet';
import { GenericError } from '../../../../components/GenericError';
import { useLPVaults } from '../../../../hooks/useLPVaults';
import { useWallet } from '../../../../hooks/useWallet';
import { NoVaultsFound } from '../NoVaultsFound';
import { Header } from './Header';
import { OptimisersBox } from './Optimisers.styled';
import { VaultListItem } from './VaultListItem';
import { VaultListItemSkeleton } from './VaultListItemSkeleton';

export const Optimisers: React.FunctionComponent = () => {
  const { signer } = useWallet();
  const dispatch = useAppDispatch();
  const chainId = useAppSelector(selectChainId);
  const { lpVaults, vaultsError, vaultsLoading, vaultsLoaded } = useLPVaults();
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

  if (vaultsError) {
    return <GenericError to={`/${routes.POOLS}`} />;
  }

  const vaultsWithDeposit = lpVaults.filter((vault) => vault.userOptimiserDeposit > 0);

  if (vaultsLoaded && vaultsWithDeposit.length === 0) {
    return (
      <NoVaultsFound
        description="Open your first position here:"
        title="You haven’t provided liquidity to any Optimiser yet."
      />
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
      <Typography colorToken="white100" typographyToken="primaryBodyMediumBold">
        Optimisers
      </Typography>
      {vaultsLoading &&
        Array.from({ length: 1 }, () => ({})).map((_, index) => (
          <React.Fragment key={index}>
            <Header />
            <VaultListItemSkeleton />
          </React.Fragment>
        ))}
      {!vaultsLoading &&
        vaultsWithDeposit.map((vault) => (
          <React.Fragment key={vault.optimiserId}>
            <Header />
            <VaultListItem
              automaticRolloverState={
                Boolean(vault.isUserRegisteredForAutoRollover) ? 'active' : 'inactive'
              }
              canRegisterUnregister={vault.canRegisterUnregister}
              depositable={vault.depositable}
              gasCost={vault.autorolloverGasCostInUSD}
              id={vault.optimiserId}
              token={vault.tokenName.toLowerCase() as NonNullable<MarketTokenProps['token']>}
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
          </React.Fragment>
        ))}
    </OptimisersBox>
  );
};
