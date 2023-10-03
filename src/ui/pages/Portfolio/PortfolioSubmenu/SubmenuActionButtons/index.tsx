import React from 'react';

import { useAppDispatch } from '../../../../../app';
import { openMarginAccountDepositFlowAction } from '../../../../../app/features/deposit-flow';
import { openMarginAccountWithdrawFlowAction } from '../../../../../app/features/portfolio';
import { isMarginAccountsLive } from '../../../../../utilities/is-margin-accounts-live';
import { useWallet } from '../../../../hooks/useWallet';
import { CreateMarginAccountButton } from './CreateMarginAcountButton';
import { Box, ButtonStyled } from './SubmenuActionButtons.styled';
import { DepositMarginDialog } from './WithdrawDepositFlow/DepositMarginDialog';
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
    dispatch(openMarginAccountDepositFlowAction({}));
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
      <DepositMarginDialog />
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
      <CreateMarginAccountButton />
    </Box>
  );
};
