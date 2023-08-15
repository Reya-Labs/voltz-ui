import { Button, CloseButton, Typography } from 'brokoli-ui';
import React from 'react';

import {
  selectCreateMarginAccountError,
  selectCreateMarginAccountLoadedState,
} from '../../../../../../../app/features/portfolio';
import { useAppSelector } from '../../../../../../../app/hooks';
import { MarginAccountsSearchField } from '../../MarginAccountsSearchField';
import { MarginAmountField, MarginAmountFieldProps } from '../../MarginAmountField';
import { WithdrawMarginDetails } from '../../WithdrawMarginDetails';
import { ContentBox, MidBox, TitleBox } from './WithdrawMarginDialogContent.styled';

// TODO: should be sorted by value
const marginAmountOptions: MarginAmountFieldProps['marginAmountOptions'] = [
  {
    token: 'dai',
    value: 1230000,
    valueFormatted: '1.23',
    valueSuffix: 'M',
  },
  {
    token: 'eth',
    value: 456000,
    valueFormatted: '456',
    valueSuffix: 'k',
  },
  {
    token: 'reth',
    value: 789,
    valueFormatted: '789',
    valueSuffix: '',
  },
  {
    token: 'steth',
    value: 12340,
    valueFormatted: '12.34',
    valueSuffix: 'k',
  },
  {
    token: 'usdc',
    value: 567000000,
    valueFormatted: '567',
    valueSuffix: 'M',
  },
  {
    token: 'usdt',
    value: 890000000,
    valueFormatted: '890',
    valueSuffix: 'M',
  },
];

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
        <MarginAmountField
          marginAmountOptions={marginAmountOptions}
          token={marginAmountOptions[0].token}
          value={'0'}
        />
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
