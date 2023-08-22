import { MarginAmountTokenField, MarginAmountTokenFieldProps } from 'brokoli-ui';
import React from 'react';

export type MarginAmountFieldProps = {
  marginAmountOptions: MarginAmountTokenFieldProps['marginAmountOptions'];
  onChange?: MarginAmountTokenFieldProps['onChange'];
  value: MarginAmountTokenFieldProps['value'];
  token: MarginAmountTokenFieldProps['token'];
  disabled: boolean;
};

export const MarginAmountField: React.FunctionComponent<MarginAmountFieldProps> = ({
  disabled,
  onChange,
  marginAmountOptions,
  value,
  token,
}) => {
  return (
    <MarginAmountTokenField
      disabled={disabled}
      label="Amount to withdraw"
      labelColorToken="lavenderWeb3"
      labelTypographyToken="primaryBodySmallRegular"
      marginAmountOptions={marginAmountOptions}
      token={token}
      typographyToken="secondaryBodyMediumBold"
      value={value}
      onChange={onChange}
    />
  );
};
