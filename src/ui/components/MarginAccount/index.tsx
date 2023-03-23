import { LabelTokenTypography } from 'brokoli-ui';
import React from 'react';

import { AccountBox, BalanceBox, MarginAccountBox } from './MarginAccount.styled';

type MarginAccountProps = {
  token: string;
  accountName: string;
  balanceValue: string;
};

export const MarginAccount: React.FunctionComponent<MarginAccountProps> = ({
  token,
  accountName,
  balanceValue,
}) => {
  return (
    <MarginAccountBox>
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
    </MarginAccountBox>
  );
};
