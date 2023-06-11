import React from 'react';

import { OptimiserInfo } from '../../../../app/features/lp-optimisers';
import { useAppNavigate } from '../../../../hooks/useAppNavigate';
import { useLPVaults } from '../../../../hooks/useLPVaults';
import { useWallet } from '../../../../hooks/useWallet';
import { VaultsBox } from './Vaults.styled';
import { VaultsTable } from './VaultsTable/VaultsTable';

export const Vaults: React.FunctionComponent = () => {
  const navigate = useAppNavigate();
  const { signer, setRequired } = useWallet();
  const { activeLpVaults, vaultsLoaded } = useLPVaults();
  const handleSelectMellowLpVault = (selectedVault: OptimiserInfo) => {
    if (!signer) {
      setRequired(true);
    } else {
      navigate.toLPOptimisersDepositForm({
        vaultId: selectedVault.optimiserId,
      });
    }
  };

  return (
    <VaultsBox>
      <VaultsTable
        dataLoading={!vaultsLoaded}
        mellowProducts={activeLpVaults}
        onSelectItem={handleSelectMellowLpVault}
      />
    </VaultsBox>
  );
};
