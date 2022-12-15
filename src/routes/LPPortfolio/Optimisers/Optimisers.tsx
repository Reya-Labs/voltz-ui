import React from 'react';

import { Loading } from '../../../components/atomic/Loading/Loading';
import { Panel } from '../../../components/atomic/Panel/Panel';
import { useWallet } from '../../../hooks/useWallet';
import { useLPVaults } from '../../LPOptimisers/useLPVaults';
import { Entry } from './Entry/Entry';
import { Header } from './Header/Header';
import { LPOptimisersTypography, OptimisersBox } from './Optimisers.styled';

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
          <Entry
            key={vault.id}
            entries={vault.metadata.vaults.map((vVaults, index) => ({
              maturityTimestampMS: vVaults.maturityTimestampMS,
              isCompleted: vault.withdrawable(index),
              pools: vVaults.pools.length,
              balance: vault.userIndividualComittedDeposits[index],
              distribution: vVaults.weight,
            }))}
            id={vault.id}
            token={vault.metadata.token}
            totalApy={0}
            totalBalance={vault.userDeposit}
          />
        ))}
    </OptimisersBox>
  );
};
