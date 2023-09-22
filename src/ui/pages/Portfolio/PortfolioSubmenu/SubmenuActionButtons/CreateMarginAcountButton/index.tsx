import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../../app';
import {
  closeCreateMarginAccountDialogAction,
  openCreateMarginAccountDialogAction,
  selectCreateMarginAccountDialogState,
} from '../../../../../../app/features/portfolio';
import { CreateMarginAccountDialog } from './CreateMarginAccountDialog';
import { CreateMarginAcountButtonStyled } from './CreateMarginAcountButton.styled';

export const CreateMarginAccountButton: React.FunctionComponent = () => {
  const isOpen = useAppSelector(selectCreateMarginAccountDialogState) === 'opened';
  const dispatch = useAppDispatch();
  const openDialog = () => {
    dispatch(openCreateMarginAccountDialogAction());
  };
  const closeDialog = () => {
    dispatch(closeCreateMarginAccountDialogAction());
  };
  return (
    <React.Fragment>
      <CreateMarginAccountDialog open={isOpen} onCloseClick={closeDialog} />
      <CreateMarginAcountButtonStyled
        typographyToken="primaryBodySmallBold"
        variant="secondary"
        onClick={openDialog}
      >
        + Margin Account
      </CreateMarginAcountButtonStyled>
    </React.Fragment>
  );
};
