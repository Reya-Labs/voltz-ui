import React from 'react';

import { isMarginAccountsLive } from '../../../../../utilities/is-margin-accounts-live';
import { Box, ButtonStyled } from './SubmenuActionButtons.styled';

export const SubmenuActionButtons: React.FunctionComponent = () => {
  if (!isMarginAccountsLive()) {
    return null;
  }

  return (
    <Box>
      <ButtonStyled typographyToken="primaryBodySmallBold" variant="secondary">
        Deposit
      </ButtonStyled>
      <ButtonStyled typographyToken="primaryBodySmallBold" variant="secondary">
        Withdraw
      </ButtonStyled>
    </Box>
  );
};
