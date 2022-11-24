import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { setPageTitle } from '../../utilities';
import { Page } from '@components/interface';
import { useCurrentSeason, useWallet } from '../../hooks';
import Leaderboard from './Leaderboard/Leaderboard';
import { RankType } from '@voltz-protocol/v1-sdk';
import { isUndefined } from 'lodash';
import { getCommunitySbt } from '../Profile/helpers';
const PER_PAGE = 10;

const TradingLeague: React.FunctionComponent = () => {
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
    let result: RankType[] = [];
    const SBT = getCommunitySbt(signer);
    result = await SBT.getRanking({
      seasonStart: season.startDate.toSeconds(),
      seasonEnd: season.endDate.toSeconds(),
    });
    setUserRanking(result, wallet.account);
    setRankings(result);
    setLoading(false);
  };

  const setUserRanking = (rankingResults: RankType[], walletAddress?: string | null) => {
    const userEntry: RankType | undefined = rankingResults.find(
      (r) => r.address.toLowerCase() === walletAddress?.toLowerCase(),
    );
    setUserPoints(userEntry?.points || -1);
    setUserRank(userEntry ? (isUndefined(userEntry.rank) ? -1 : userEntry.rank) : -1);
  };

  useEffect(() => {
    setUserRanking(rankings, wallet.account);
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
          rankings={rankings.slice(page * 10, page * 10 + PER_PAGE)}
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
