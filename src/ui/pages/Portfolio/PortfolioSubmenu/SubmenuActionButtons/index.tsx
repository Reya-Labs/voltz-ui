import React from 'react';

import { isMarginAccountsLive } from '../../../../../utilities/is-margin-accounts-live';
import { Box, ButtonStyled } from './SubmenuActionButtons.styled';
import { WithdrawMarginDialog } from './WithdrawMarginDialog';

export const SubmenuActionButtons: React.FunctionComponent = () => {
  if (!isMarginAccountsLive()) {
    return null;
  }

  return (
    <Box>
      <WithdrawMarginDialog />
      <ButtonStyled typographyToken="primaryBodySmallBold" variant="secondary">
        Deposit
      </ButtonStyled>
      <ButtonStyled typographyToken="primaryBodySmallBold" variant="secondary">
        Withdraw
      </ButtonStyled>
    </Box>
  );
};
