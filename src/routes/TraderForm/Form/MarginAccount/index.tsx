import { LabelTokenTypography } from 'brokoli-ui';
import React from 'react';

import { AccountBox, BalanceBox, MarginAccountBox } from './MarginAccount.styled';

type MarginAccountProps = {};

export const MarginAccount: React.FunctionComponent<MarginAccountProps> = () => {
  const balanceValue = '12k';
  const token = ' USDC';
  // The name of the pool is “{pool_token} {maturity}” (e.g. aUSDT_bor Dec22, aETH_len Mar23, stETH Jan23);
  const accountName = 'aUSDT_bor Dec22';
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
          label="Balance"
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
