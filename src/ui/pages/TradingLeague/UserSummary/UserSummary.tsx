import { Pill, Typography } from 'brokoli-ui';
import React from 'react';

import { Entry } from '../Entry/Entry';
import { Header } from '../Header/Header';
import { PointsSystem } from './PointsSystem/PointsSystem';
import { CurrentPositionBox, HeaderEntryBox, UserSummaryBox } from './UserSummary.styled';

export type UserSummaryProps = {
  seasonNumber: string;
  userRank?: number;
  userAddress?: string;
  userPoints?: number;
  loading: boolean;
};

export const UserSummary = ({
  loading,
  seasonNumber,
  userRank,
  userAddress,
  userPoints,
}: UserSummaryProps) => {
  return (
    <UserSummaryBox>
      <Pill colorToken="lavenderWeb" typographyToken="primaryBodySmallBold" variant="regular">
        {`SEASON ${seasonNumber}`}
      </Pill>
      <PointsSystem />
      <CurrentPositionBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader3Black">
          Current Position
        </Typography>
        <HeaderEntryBox>
          <Header />
          <Entry
            address={userAddress || ''}
            loading={loading}
            points={userPoints || 0}
            rank={userRank || 0}
            variant="me"
          />
        </HeaderEntryBox>
      </CurrentPositionBox>
    </UserSummaryBox>
  );
};
