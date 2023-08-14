import { Button, CloseButton, TextField, Typography } from 'brokoli-ui';
import React, { useState } from 'react';

import {
  createMarginAccountThunk,
  selectCreateMarginAccountError,
  selectCreateMarginAccountLoadedState,
} from '../../../../../../../app/features/portfolio';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { useWallet } from '../../../../../../../hooks/useWallet';
import { MarginAccountsSearchField } from '../../MarginAccountsSearchField';
import { WithdrawMarginDetails } from '../../WithdrawMarginDetails';
import { ContentBox, TitleBox } from './WithdrawMarginDialogContent.styled';

export const WithdrawMarginDialogContent: React.FunctionComponent = () => {
  const { signer } = useWallet();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCreateMarginAccountLoadedState) === 'pending';
  const error = useAppSelector(selectCreateMarginAccountError);
  const [name, setName] = useState('');
  const handleOnCloseClick = () => {};
  const handleOnVerifyClick = () => {
    void dispatch(
      createMarginAccountThunk({
        signer,
        name,
      }),
    );
  };
  const handleOnNameChange = (value: string | undefined) => {
    if (value === undefined) {
      setName('');
      return;
    }
    // Use a regular expression to match anything that is not a digit or a letter
    const regex = /[^a-zA-Z\d]/g;

    // Remove unwanted characters using the replace method
    const cleanedValue = value.replace(regex, '');

    setName(cleanedValue);
  };
  return (
    <ContentBox>
      <TitleBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Withdraw
        </Typography>
        <CloseButton onClick={handleOnCloseClick} />
      </TitleBox>
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
        consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
      </Typography>
      <TextField
        label="Amount to withdraw"
        labelColorToken="lavenderWeb3"
        labelTypographyToken="primaryBodySmallRegular"
        placeHolder="Example Name"
        type="text"
        typographyToken="secondaryBodyMediumBold"
        value={name}
        onChange={handleOnNameChange}
      />
      <MarginAccountsSearchField />
      <WithdrawMarginDetails />
      <Button
        bottomLeftText={error ? error : ''}
        bottomLeftTextColorToken={error ? 'wildStrawberry' : undefined}
        bottomLeftTextTypographyToken={error ? 'primaryBodyXSmallRegular' : undefined}
        disabled={loading}
        loading={loading}
        variant="primary"
        onClick={handleOnVerifyClick}
      >
        Withdraw
      </Button>
    </ContentBox>
  );
};
