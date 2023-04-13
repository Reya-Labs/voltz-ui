import { TradingLeagueHeader } from '../TradingLeagueHeader/TradingLeagueHeader';
import { UserSummary } from '../UserSummary/UserSummary';
import { LeaderboardHeaderBox } from './LeaderboardHeader.styled';

type RankingTableHeaderProps = {
  loading: boolean;
  seasonNumber: string;
  userRank: number;
  userAddress: string;
  userPoints: number;
};

export const LeaderboardHeader = ({
  loading,
  seasonNumber,
  userAddress,
  userRank,
  userPoints,
}: RankingTableHeaderProps) => (
  <LeaderboardHeaderBox data-testid="LeaderboardHeader-Box">
    <TradingLeagueHeader />
    <UserSummary
      loading={loading}
      seasonNumber={seasonNumber}
      userAddress={userAddress}
      userPoints={userPoints}
      userRank={userRank + 1}
    />
  </LeaderboardHeaderBox>
);
