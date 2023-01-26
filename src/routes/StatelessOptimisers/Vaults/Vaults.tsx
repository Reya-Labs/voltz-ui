import React, { useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import { OptimiserInfo } from '../../../app/features/stateless-optimisers';
import { useWallet } from '../../../hooks/useWallet';
import { setPageTitle } from '../../../utilities/page';
import { routes } from '../../paths';
import { useLPVaults } from '../useLPVaults';
import { VaultsBox } from './Vaults.styled';
import { VaultsTable } from './VaultsTable/VaultsTable';

export const Vaults: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { signer, setRequired } = useWallet();
  const { lpVaults, vaultsLoaded } = useLPVaults();

  const handleSelectMellowLpVault = (selectedOptimiser: OptimiserInfo) => {
    if (!signer) {
      setRequired(true);
    } else {
      const path = generatePath(routes.LP_OPTIMISERS_DEPOSIT_FORM, {
        actions: 'deposit',
        vaultId: selectedOptimiser.optimiserId,
      });
      navigate(`/${path}`);
    }
  };

  useEffect(() => {
    setPageTitle('LP Optimisers');
  }, []);

  return (
    <VaultsBox>
      <VaultsTable
        dataLoading={!vaultsLoaded}
        mellowProducts={lpVaults}
        onSelectItem={handleSelectMellowLpVault}
      />
    </VaultsBox>
  );
};
