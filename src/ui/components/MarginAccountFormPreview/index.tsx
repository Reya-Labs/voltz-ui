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
        colorToken="lavenderWeb"
        label="Account"
        labelColorToken="lavenderWeb2"
        labelTypographyToken="primaryBodyXSmallRegular"
        token=""
        typographyToken="primaryBodyMediumBold"
        value={accountName}
      />
    </AccountBox>
    <BalanceBox>
      <LabelTokenTypography
        colorToken="lavenderWeb"
        label="Margin"
        labelColorToken="lavenderWeb2"
        labelTypographyToken="primaryBodyXSmallRegular"
        token={token}
        typographyToken="secondaryBodyMediumRegular"
        value={balanceValue}
      />
    </BalanceBox>
  </Box>
);
