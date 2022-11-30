import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import { setPageTitle } from '../../utilities/page';
import { routes } from '../paths';
import { ConnectedMellowLpDepositForm } from './ConnectedMellowLpDepositForm/ConnectedMellowLpDepositForm';
import { ConnectedMellowBox } from './EcosystemDeposit.styled';

export const EcosystemDeposit: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(`/${routes.LP_OPTIMISERS}`);
  const lpVaults = useAppSelector((state) => state.ecosystem.lpVaults);
  const { vaultId } = useParams();
  const currentVault = lpVaults.find((v) => v.id === vaultId);
  useEffect(() => {
    setPageTitle('Deposit Form');
  }, []);

  if (!currentVault) {
    return null;
  }

  return (
    <ConnectedMellowBox>
      <ConnectedMellowLpDepositForm vault={currentVault} onCancel={handleGoBack} />
    </ConnectedMellowBox>
  );
};
