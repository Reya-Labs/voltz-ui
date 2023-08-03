import { Typography } from 'brokoli-ui';
import React from 'react';

import { selectTotalMarginAccountsFormatted } from '../../../../../app/features/portfolio';
import { useAppSelector } from '../../../../../app/hooks';
import { MarginAccountList } from '../MarginAccountList';
import { MarginAccountsSortOptions } from '../MarginAccountsSortOptions';
import { PortfolioHeader } from './PortfolioHeader';
import {
  BottomBox,
  LeftBox,
  PositionsBox,
  PositionsSelectorBox,
  RightBox,
} from './Positions.styled';

export const Positions: React.FunctionComponent = () => {
  const totalMarginAccounts = useAppSelector(selectTotalMarginAccountsFormatted);

  return (
    <PositionsBox>
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
    </PositionsBox>
  );
};
