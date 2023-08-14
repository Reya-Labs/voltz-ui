import { Button, CloseButton, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectCreateMarginAccountError,
  selectCreateMarginAccountLoadedState,
} from '../../../../../../../app/features/portfolio';
import { useAppSelector } from '../../../../../../../app/hooks';
import { MarginAccountsSearchField } from '../../MarginAccountsSearchField';
import { MarginAmountField } from '../../MarginAmountField';
import { WithdrawMarginDetails } from '../../WithdrawMarginDetails';
import { ContentBox, MidBox, TitleBox } from './WithdrawMarginDialogContent.styled';

export const WithdrawMarginDialogContent: React.FunctionComponent = () => {
  const loading = useAppSelector(selectCreateMarginAccountLoadedState) === 'pending';
  const error = useAppSelector(selectCreateMarginAccountError);
  const handleOnCloseClick = () => {};
  const handleOnVerifyClick = () => {};
  return (
    <ContentBox>
      <TitleBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Withdraw Margin
        </Typography>
        <CloseButton onClick={handleOnCloseClick} />
      </TitleBox>
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
        consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
      </Typography>
      <MidBox>
        <MarginAccountsSearchField />
        <MarginAmountField />
        <WithdrawMarginDetails />
      </MidBox>
      <Button
        bottomLeftText={error ? error : ''}
        bottomLeftTextColorToken={error ? 'wildStrawberry' : undefined}
        bottomLeftTextTypographyToken={error ? 'primaryBodyXSmallRegular' : undefined}
        disabled={loading}
        loading={loading}
        variant="primary"
        onClick={handleOnVerifyClick}
      >
        Withdraw Margin
      </Button>
    </ContentBox>
  );
};
