import { Button, CloseButton, TextField, Typography } from 'brokoli-ui';
import React, { useState } from 'react';

import { ContentBox, TitleBox } from './CreateMarginAccountDialogContent.styled';

export const CreateMarginAccountDialogContent: React.FunctionComponent = () => {
  const error = '';
  const loading = false;
  const handleOnVerifyClick = () => {};
  const handleOnClose = () => {};
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
  const [name, setName] = useState('');
  return (
    <ContentBox>
      <TitleBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Bold">
          Create a Margin Account
        </Typography>
        <CloseButton onClick={handleOnClose} />
      </TitleBox>
      <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
        consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
      </Typography>
      <TextField
        label="Name of the account"
        labelColorToken="lavenderWeb3"
        labelTypographyToken="primaryBodySmallRegular"
        placeHolder="Example Name"
        type="text"
        typographyToken="secondaryBodyMediumBold"
        value={name}
        onChange={handleOnNameChange}
      />
      <Button
        bottomLeftText={error ? error : ''}
        bottomLeftTextColorToken={error ? 'wildStrawberry' : undefined}
        bottomLeftTextTypographyToken={error ? 'primaryBodyXSmallRegular' : undefined}
        disabled={loading || name.length < 3}
        loading={loading}
        variant="primary"
        onClick={handleOnVerifyClick}
      >
        Create account
      </Button>
    </ContentBox>
  );
};
