import Box from '@mui/material/Box';
import { DateTime } from 'luxon';
import React from 'react';

import { ProgressBar } from '../../../components/atomic/ProgressBar/ProgressBar';
import { formatDateTime } from '../../../utilities/date';
import { Entry } from '../Entry/Entry';
import { Header } from '../Header/Header';
import { Percentage } from './Percentage/Percentage';
import { PointsSystem } from './PointsSystem/PointsSystem';
import {
  CurrentPositionTypography,
  EndsTypography,
  HeaderEntryBox,
  PointsSystemBox,
  ProgressBarBox,
  SeasonAndProgressBarBox,
  SeasonBox,
  SeasonNumberTypography,
  SeasonTypography,
  UserSummaryBox,
} from './UserSummary.styled';

export type RankingUserSummaryProps = {
  seasonNumber: string;
  seasonStartDate: DateTime;
  seasonEndDate: DateTime;
  userRank?: number;
  userAddress?: string;
  userPoints?: number;
  loading: boolean;
};

export const UserSummary = ({
  loading,
  seasonNumber,
  seasonStartDate,
  seasonEndDate,
  userRank,
  userAddress,
  userPoints,
}: RankingUserSummaryProps) => {
  const percentage = React.useMemo(() => {
    const now = Date.now().valueOf();
    return Math.round(
      100 *
        ((now - seasonStartDate.toMillis()) /
          (seasonEndDate.toMillis() - seasonStartDate.toMillis())),
    );
  }, [seasonStartDate, seasonEndDate]);

  return (
    <UserSummaryBox>
      <SeasonAndProgressBarBox>
        <SeasonBox>
          <SeasonTypography variant="subtitle1">
            SEASON&nbsp;
            <SeasonNumberTypography>{seasonNumber}</SeasonNumberTypography>
          </SeasonTypography>
        </SeasonBox>

        <ProgressBarBox>
          <ProgressBar
            leftContent={
              <EndsTypography variant="body2">Ends: {formatDateTime(seasonEndDate)}</EndsTypography>
            }
            percentageComplete={percentage}
            rightContent={<Percentage percentage={percentage} />}
          />
        </ProgressBarBox>
      </SeasonAndProgressBarBox>

      <PointsSystemBox>
        <PointsSystem />
      </PointsSystemBox>

      <Box>
        <CurrentPositionTypography variant="h1">CURRENT POSITION</CurrentPositionTypography>
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
      </Box>
    </UserSummaryBox>
  );
};
