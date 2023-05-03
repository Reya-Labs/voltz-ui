import { generatePath, useNavigate } from 'react-router-dom';

import { routes } from '../../routes/paths';

type UseAppNavigateResult = {
  toLPFormPage: (params: {
    ammId: string;
    poolId: string;
    fixedUpper?: number;
    fixedLower?: number;
  }) => void;
  toSwapFormPage: (params: { ammId: string; poolId: string }) => void;
  toRolloverSwapFormPage: (params: { ammId: string; poolId: string; positionId: string }) => void;
  toLPOptimisersDepositForm: (params: { vaultId: string }) => void;
};
export const useAppNavigate = (): UseAppNavigateResult => {
  const navigate = useNavigate();

  const toLPFormPage: UseAppNavigateResult['toLPFormPage'] = ({
    ammId,
    poolId,
    fixedUpper,
    fixedLower,
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

  const toSwapFormPage: UseAppNavigateResult['toSwapFormPage'] = ({ ammId, poolId }) => {
    const path = generatePath(routes.TRADER_SWAP_FORM, {
      ammId,
      poolId,
    });
    navigate(`/${path}`);
  };

  const toRolloverSwapFormPage: UseAppNavigateResult['toRolloverSwapFormPage'] = ({
    ammId,
    poolId,
    positionId,
  }) => {
    const path = generatePath(routes.TRADER_ROLLOVER_SWAP_FORM, {
      ammId,
      poolId,
      positionId,
    });
    navigate(`/${path}`);
  };

  const toLPOptimisersDepositForm: UseAppNavigateResult['toLPOptimisersDepositForm'] = ({
    vaultId,
  }) => {
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
