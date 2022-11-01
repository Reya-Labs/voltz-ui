import React, { useEffect, useState } from 'react';

import { RankingTable } from '@components/interface';
import { useRanking, useCurrentSeason, useWallet } from '@hooks';
import { RankType } from '../../../utilities/data';
const PER_PAGE = 10;

const ConnectedRankingTable: React.FunctionComponent = () => {
  const { rankings } = useRanking();
  const { result: ranking, loading, call } = rankings;
  const season = useCurrentSeason();
  const [rankingResults, setRankingResults] = useState<RankType[]>([]);
  const wallet = useWallet();
  const [userRank, setUserRank] = useState<number>(-1);
  const [userPoints, setUserPoints] = useState<number>(-1);
  const [page, setPage] = useState<number>(0);
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
  useEffect(() => {
    call();
  }, [call]);

  useEffect(() => {
    if (!ranking) {
      return;
    }

    const rankResult: RankType[] = [];
    const keys = Array.from(ranking.keys());
    keys.forEach((address) => {
      const value = ranking.get(address);
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
  }, [wallet.account, ranking]);

  return (
    <RankingTable
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
  );
};

export default ConnectedRankingTable;
