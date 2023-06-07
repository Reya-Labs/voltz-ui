import React, { useEffect } from 'react';

import { OptimiserInfo } from '../../../app/features/lp-optimisers';
import { useAppNavigate } from '../../../hooks/useAppNavigate';
import { useWallet } from '../../../hooks/useWallet';
import { setPageTitle } from '../../../utilities/page';
import { useLPVaults } from '../useLPVaults';
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

  useEffect(() => {
    setPageTitle('LP Optimisers');
  }, []);

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
