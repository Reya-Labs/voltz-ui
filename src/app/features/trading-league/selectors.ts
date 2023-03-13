import { RootState } from '../../store';
import { selectChainId } from '../network';

export const selectTradingLeagueStatus = (state: RootState) => {
  const chainId = selectChainId(state);
  if (!chainId) {
    return 'idle';
  }
  return state.tradingLeague.status[chainId];
};

export const selectTradingLeagueRankings = (state: RootState) => {
  const chainId = selectChainId(state);
  if (!chainId) {
    return [];
  }
  return state.tradingLeague.rankings[chainId];
};
