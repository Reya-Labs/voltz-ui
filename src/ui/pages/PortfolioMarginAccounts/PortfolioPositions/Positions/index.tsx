import { Typography } from 'brokoli-ui';
import React from 'react';

import { selectTotalMarginAccounts } from '../../../../../app/features/portfolio';
import { useAppSelector } from '../../../../../app/hooks';
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
  const totalMarginAccounts = useAppSelector(selectTotalMarginAccounts);

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
      </BottomBox>
    </PositionsBox>
  );
};
