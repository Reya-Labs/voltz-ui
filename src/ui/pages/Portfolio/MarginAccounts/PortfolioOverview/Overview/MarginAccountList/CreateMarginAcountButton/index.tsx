import React, { useState } from 'react';

import { CreateMarginAccountDialog } from './CreateMarginAccountDialog';
import { CreateMarginAcountButtonStyled } from './CreateMarginAcountButton.styled';

export const CreateMarginAccountButton: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  return (
    <React.Fragment>
      <CreateMarginAccountDialog open={isOpen} onCloseClick={closeDialog} />
      <CreateMarginAcountButtonStyled
        typographyToken="primaryBodySmallBold"
        variant="secondary"
        onClick={openDialog}
      >
        Create a New Margin Account +
      </CreateMarginAcountButtonStyled>
    </React.Fragment>
  );
};
