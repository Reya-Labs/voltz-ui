import { LabelTokenTypography } from 'brokoli-ui';
import React from 'react';

import { AccountBox, BalanceBox, Box } from './MarginAccountFormPreview.styled';

type MarginAccountFormPreviewProps = {
  token: string;
  accountName: string;
  balanceValue: string;
};

export const MarginAccountFormPreview: React.FunctionComponent<MarginAccountFormPreviewProps> = ({
  token,
  accountName,
  balanceValue,
}) => (
  <Box>
    <AccountBox>
      <LabelTokenTypography
        colorToken="white"
        label="Account"
        labelColorToken="white300"
        labelTypographyToken="primaryBodyXSmallRegular"
        token=""
        typographyToken="primaryBodyMediumBold"
        value={accountName}
      />
    </AccountBox>
    <BalanceBox>
      <LabelTokenTypography
        colorToken="white"
        label="Margin"
        labelColorToken="white300"
        labelTypographyToken="primaryBodyXSmallRegular"
        token={token}
        typographyToken="secondaryBodyMediumRegular"
        value={balanceValue}
      />
    </BalanceBox>
  </Box>
);
