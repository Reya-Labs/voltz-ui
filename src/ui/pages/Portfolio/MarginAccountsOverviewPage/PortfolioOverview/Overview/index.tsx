import { Typography } from 'brokoli-ui';
import React from 'react';

import { useAppSelector } from '../../../../../../app';
import { selectTotalMarginAccountsFormatted } from '../../../../../../app/features/portfolio';
import { MarginAccountList } from './MarginAccountList';
import { MarginAccountsSortOptions } from './MarginAccountsSortOptions';
import { BottomBox, LeftBox, OverviewBox, PositionsSelectorBox, RightBox } from './Overview.styled';
import { PortfolioHeader } from './PortfolioHeader';

export const Overview: React.FunctionComponent = () => {
  const totalMarginAccounts = useAppSelector(selectTotalMarginAccountsFormatted);

  return (
    <OverviewBox>
      <PortfolioHeader />
      <BottomBox>
        <PositionsSelectorBox>
          <LeftBox>
            <Typography colorToken="lavenderWeb" typographyToken="primaryBodyMediumBold">
              {totalMarginAccounts} Margin Accounts
            </Typography>
          </LeftBox>
          <RightBox>
            <Typography colorToken="lavenderWeb" typographyToken="primaryBodyXSmallRegular">
              Order by
            </Typography>
            <MarginAccountsSortOptions />
          </RightBox>
        </PositionsSelectorBox>
        <MarginAccountList />
      </BottomBox>
    </OverviewBox>
  );
};
