import { CloseButton, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppDispatch } from '../../../../../../../../app';
import { closeMarginAccountDepositFlowAction } from '../../../../../../../../app/features/deposit-flow';
import { ContentBox, TitleBox } from './DepositMarginSuccessDialogContent.styled';
import { DepositSuccessMarginDetails } from './DepositSuccessMarginDetails';

export const DepositMarginSuccessDialogContent: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const handleOnCloseClick = () => dispatch(closeMarginAccountDepositFlowAction());

  return (
    <ContentBox>
      <TitleBox>
        <Typography colorToken="white100" typographyToken="primaryHeader3Bold">
          Successful Deposit
        </Typography>
        <CloseButton onClick={handleOnCloseClick} />
      </TitleBox>
      <Typography colorToken="white300" typographyToken="primaryBodySmallRegular">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
        consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
      </Typography>
      <DepositSuccessMarginDetails />
    </ContentBox>
  );
};
