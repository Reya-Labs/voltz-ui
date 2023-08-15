import { TextField } from 'brokoli-ui';
import React, { useState } from 'react';

export const MarginAmountField: React.FunctionComponent = () => {
  const [name, setName] = useState('');

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
  );
};
