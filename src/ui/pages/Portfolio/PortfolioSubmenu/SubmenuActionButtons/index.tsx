import React from 'react';

import { openMarginAccountWithdrawFlowAction } from '../../../../../app/features/portfolio';
import { useAppDispatch } from '../../../../../app/hooks';
import { useWallet } from '../../../../../hooks/useWallet';
import { isMarginAccountsLive } from '../../../../../utilities/is-margin-accounts-live';
import { Box, ButtonStyled } from './SubmenuActionButtons.styled';
import { WithdrawMarginDialog } from './WithdrawDepositFlow/WithdrawMarginDialog';

export const SubmenuActionButtons: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { setRequired, account } = useWallet();
  if (!isMarginAccountsLive()) {
    return null;
  }
  const handleOnDepositClick = () => {
    if (!account) {
      setRequired(true);
      return;
    }
  };

  const handleOnWithdrawClick = () => {
    if (!account) {
      setRequired(true);
      return;
    }
    dispatch(openMarginAccountWithdrawFlowAction());
  };
  return (
    <Box>
      <WithdrawMarginDialog />
      <ButtonStyled
        typographyToken="primaryBodySmallBold"
        variant="secondary"
        onClick={handleOnDepositClick}
      >
        Deposit
      </ButtonStyled>
      <ButtonStyled
        typographyToken="primaryBodySmallBold"
        variant="secondary"
        onClick={handleOnWithdrawClick}
      >
        Withdraw
      </ButtonStyled>
    </Box>
  );
};
