import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { setPageTitle } from '@utilities';
import { Page } from '@components/interface';
import { useCurrentSeason, useWallet } from '@hooks';
import { RankType } from './types';
import { getActivity } from '@graphql';
import Leaderboard from './Leaderboard/Leaderboard';
const PER_PAGE = 10;

const TradingLeague: React.FunctionComponent = () => {
  const { account } = useWallet();
  const [loading, setLoading] = useState(true);
  const season = useCurrentSeason();
  const [rankingResults, setRankingResults] = useState<RankType[]>([]);
  const wallet = useWallet();
  const [userRank, setUserRank] = useState<number>(-1);
  const [userPoints, setUserPoints] = useState<number>(-1);
  const [page, setPage] = useState<number>(0);
  const [ranking, setRanking] = useState<Map<string, number>>();
  const maxPages = Math.floor(rankingResults.length / PER_PAGE) + 1;

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
    const result = (await getActivity({ from: season.startDate.toSeconds() })).total;
    setRanking(result);
    mapAndSetRankingResults(result);
    setLoading(false);
  };

  const mapAndSetRankingResults = (rankingMap: Map<string, number> | undefined) => {
    if (!rankingMap) {
      return;
    }

    const rankResult: RankType[] = [];
    const keys = Array.from(rankingMap.keys());
    keys.forEach((address) => {
      const value = rankingMap.get(address);
      rankResult.push({ address: address, points: value ?? 0 });
    });

    const sorted = rankResult.sort((a, b) => b.points - a.points);

    if (sorted) {
      for (let rank = 0; rank < sorted.length; rank++) {
        const entry = sorted[rank];
        if (entry.address === wallet.account) {
          setUserPoints(entry.points);
          setUserRank(rank);
        }
      }
    }

    setRankingResults(sorted);
  };

  useEffect(() => {
    mapAndSetRankingResults(ranking);
  }, [wallet.account]);

  useEffect(() => {
    setPageTitle('Trading League', account);
    void fetchRankings();
  }, []);

  return (
    <Page>
      <Box
        sx={{
          width: '724px',
          margin: '0 auto',
          background: 'transparent',
        }}
      >
        <Leaderboard
          loading={loading}
          rankings={rankingResults.slice(page * 10, page * 10 + PER_PAGE)}
          maxPages={maxPages}
          userAddress={wallet.account || ''}
          userRank={userRank}
          userPoints={userPoints}
          seasonNumber={season.shortName}
          seasonStartDate={season.startDate}
          seasonEndDate={season.endDate}
          page={page}
          onNextPage={handleOnNextPage}
          onPrevPage={handleOnPrevPage}
          perPage={PER_PAGE}
        />
      </Box>
    </Page>
  );
};

export default TradingLeague;
