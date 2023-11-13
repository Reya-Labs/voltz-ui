import { CloseButton, Typography } from 'brokoli-ui';
import React from 'react';

import { useAppDispatch } from '../../../../../../../../app';
import { closeMarginAccountWithdrawFlowAction } from '../../../../../../../../app/features/portfolio';
import { ContentBox, TitleBox } from './WithdrawMarginSuccessDialogContent.styled';
import { WithdrawSuccessMarginDetails } from './WithdrawSuccessMarginDetails';

export const WithdrawMarginSuccessDialogContent: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const handleOnCloseClick = () => dispatch(closeMarginAccountWithdrawFlowAction());

  return (
    <ContentBox>
      <TitleBox>
        <Typography colorToken="white100" typographyToken="primaryHeader3Bold">
          Successful Withdraw
        </Typography>
        <CloseButton onClick={handleOnCloseClick} />
      </TitleBox>
      <Typography colorToken="white300" typographyToken="primaryBodySmallRegular">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
        consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
      </Typography>
      <WithdrawSuccessMarginDetails />
    </ContentBox>
  );
};
