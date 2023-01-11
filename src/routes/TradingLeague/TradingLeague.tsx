import { RankType } from '@voltz-protocol/v1-sdk';
import React, { useEffect, useState } from 'react';

import { useCurrentSeason } from '../../hooks/season/useCurrentSeason';
import { useWallet } from '../../hooks/useWallet';
import { setPageTitle } from '../../utilities/page';
import { getCommunitySbt } from '../Profile/helpers';
import { Leaderboard } from './Leaderboard/Leaderboard';
import { TradingLeagueBox } from './TradingLeague.styled';
const PER_PAGE = 10;

export const TradingLeague: React.FunctionComponent = () => {
  const { account, signer } = useWallet();
  const [loading, setLoading] = useState(true);
  const season = useCurrentSeason();
  const [rankings, setRankings] = useState<RankType[]>([]);
  const wallet = useWallet();
  const [userRank, setUserRank] = useState<number>(-1);
  const [userPoints, setUserPoints] = useState<number>(-1);
  const [page, setPage] = useState<number>(0);
  const maxPages = Math.floor(rankings.length / PER_PAGE) + 1;

  const handleOnNextPage = () => {
    if (page + 1 < maxPages) {
      setPage(page + 1);
    }
  };

  const handleOnPrevPage = () => {
    if (page - 1 > -1) {
      setPage(page - 1);
    }
  };

  const fetchRankings = async () => {
    setLoading(true);
    const SBT = getCommunitySbt(signer);
    const { traderRankResults: result } = await SBT.getRanking(season.id);
    setUserRanking(result, wallet.account);
    setRankings(result);
    setLoading(false);
  };

  const setUserRanking = (rankingResults: RankType[], walletAddress?: string | null) => {
    const userEntry: RankType | undefined = rankingResults.find(
      (r) => r.address.toLowerCase() === walletAddress?.toLowerCase(),
    );
    setUserPoints(userEntry?.points || -1);
    setUserRank(userEntry?.rank ?? -1);
  };

  useEffect(() => {
    setUserRanking(rankings, wallet.account);
  }, [wallet.account]);

  useEffect(() => {
    setPageTitle('Trading League', account);
    void fetchRankings();
  }, []);

  return (
    <TradingLeagueBox>
      <Leaderboard
        loading={loading}
        maxPages={maxPages}
        page={page}
        perPage={PER_PAGE}
        rankings={rankings}
        seasonEndDate={season.endDate}
        seasonNumber={season.shortName}
        seasonStartDate={season.startDate}
        userAddress={wallet.account || ''}
        userPoints={userPoints}
        userRank={userRank}
        onNextPage={handleOnNextPage}
        onPrevPage={handleOnPrevPage}
      />
    </TradingLeagueBox>
  );
};
