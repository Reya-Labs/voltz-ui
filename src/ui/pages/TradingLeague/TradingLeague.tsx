import { RankType } from '@voltz-protocol/v1-sdk';
import React, { useEffect, useMemo, useState } from 'react';

import { selectChainId } from '../../../app/features/network';
import {
  fetchRankingsThunk,
  selectTradingLeagueRankings,
  selectTradingLeagueStatus,
} from '../../../app/features/trading-league';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useCurrentSeason } from '../../../hooks/season/useCurrentSeason';
import { useWallet } from '../../../hooks/useWallet';
import { setPageTitle } from '../../../utilities/page';
import { Leaderboard } from './Leaderboard/Leaderboard';
import { TradingLeagueBox } from './TradingLeague.styled';

const PER_PAGE = 10;

export const TradingLeague: React.FunctionComponent = () => {
  const { account, signer } = useWallet();
  const chainId = useAppSelector(selectChainId);
  const tradingLeagueStatus = useAppSelector(selectTradingLeagueStatus);
  const loading = tradingLeagueStatus === 'pending' || tradingLeagueStatus === 'idle';
  const season = useCurrentSeason(chainId);
  const rankings = useAppSelector(selectTradingLeagueRankings);
  const wallet = useWallet();
  const [page, setPage] = useState<number>(0);
  const maxPages = Math.floor(rankings.length / PER_PAGE) + 1;
  const dispatch = useAppDispatch();

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

  const { userPoints, userRank } = useMemo(() => {
    const userEntry: RankType | undefined = rankings.find(
      (r) => r.address.toLowerCase() === wallet.account?.toLowerCase(),
    );
    return {
      userPoints: userEntry?.points || -1,
      userRank: userEntry?.rank ?? -1,
    };
  }, [rankings, wallet.account]);

  useEffect(() => {
    setPageTitle('Trading League', account);
  }, []);

  useEffect(() => {
    if (!chainId) {
      return;
    }
    if (tradingLeagueStatus === 'succeeded') {
      return;
    }
    void dispatch(
      fetchRankingsThunk({
        chainId,
        seasonId: season.id,
        signer,
      }),
    );
  }, [signer, dispatch, tradingLeagueStatus, season.id, chainId]);

  return (
    <TradingLeagueBox>
      <Leaderboard
        loading={loading}
        maxPages={maxPages}
        page={page}
        perPage={PER_PAGE}
        rankings={rankings}
        seasonNumber={season.shortName}
        userAddress={wallet.account || ''}
        userPoints={userPoints}
        userRank={userRank}
        onNextPage={handleOnNextPage}
        onPrevPage={handleOnPrevPage}
      />
    </TradingLeagueBox>
  );
};
