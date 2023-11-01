import { Typography } from 'brokoli-ui';
import React from 'react';

import {
  ActionBox,
  DateBox,
  HeaderBox,
  OutcomeBox,
  SizeBox,
} from './TransactionHistoryList.styled';

export const Header: React.FunctionComponent = () => {
  return (
    <HeaderBox>
      <DateBox>
        <Typography colorToken="white400" typographyToken="primaryBodyXSmallRegular">
          Date
        </Typography>
      </DateBox>
      <ActionBox>
        <Typography colorToken="white400" typographyToken="primaryBodyXSmallRegular">
          Action
        </Typography>
      </ActionBox>
      <SizeBox>
        <Typography colorToken="white400" typographyToken="primaryBodyXSmallRegular">
          Size
        </Typography>
      </SizeBox>
      <OutcomeBox>
        <Typography colorToken="white400" typographyToken="primaryBodyXSmallRegular">
          Outcome
        </Typography>
      </OutcomeBox>
    </HeaderBox>
  );
};
