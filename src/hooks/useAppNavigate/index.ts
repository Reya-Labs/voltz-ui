import { generatePath, useNavigate } from 'react-router-dom';

import { routes } from '../../routes/paths';

export const useAppNavigate = () => {
  const navigate = useNavigate();

  const toLPFormPage = ({
    ammId,
    poolId,
    fixedUpper,
    fixedLower,
  }: {
    ammId: string;
    poolId: string;
    fixedUpper?: number;
    fixedLower?: number;
  }) => {
    const path = generatePath(routes.LP_FORM, {
      ammId,
      poolId,
    });
    if (fixedLower !== undefined && fixedUpper !== undefined) {
      navigate(`/${path}?fixedLower=${fixedLower}&fixedUpper=${fixedUpper}`);
      return;
    }
    navigate(`/${path}`);
  };

  const toSwapFormPage = ({ ammId, poolId }: { ammId: string; poolId: string }) => {
    const path = generatePath(routes.TRADER_SWAP_FORM, {
      ammId,
      poolId,
    });
    navigate(`/${path}`);
  };

  const toRolloverSwapFormPage = ({ ammId, poolId }: { ammId: string; poolId: string }) => {
    const path = generatePath(routes.TRADER_ROLLOVER_SWAP_FORM, {
      ammId,
      poolId,
    });
    navigate(`/${path}`);
  };

  const toLPOptimisersDepositForm = ({ vaultId }: { vaultId: string }) => {
    const path = generatePath(routes.LP_OPTIMISERS_DEPOSIT_FORM, {
      actions: 'deposit',
      vaultId,
    });
    navigate(`/${path}`);
  };

  return {
    toLPFormPage,
    toSwapFormPage,
    toRolloverSwapFormPage,
    toLPOptimisersDepositForm,
  };
};
