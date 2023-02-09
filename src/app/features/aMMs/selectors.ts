import { AMM, BorrowAMM } from '@voltz-protocol/v1-sdk';

import { getConfig } from '../../../hooks/voltz-config/config';
import { isBorrowing } from '../../../utilities/amm';
import { RootState } from '../../store';
import { selectNetwork } from '../network';

export const selectAMMs = (state: RootState): AMM[] => {
  const network = selectNetwork(state);
  const config = getConfig(network);
  if (!config) {
    return [];
  }
  const generalPoolIds = config.apply
    ? config.pools.filter((pool) => pool.show.general).map((pool) => pool.id.toLowerCase())
    : [];
  if (generalPoolIds.length === 0) {
    return state.aMMs.aMMs[network];
  }
  return state.aMMs.aMMs[network].filter((amm) => generalPoolIds.includes(amm.id.toLowerCase()));
};

export const selectTraderAMMs = (state: RootState): AMM[] => {
  const network = selectNetwork(state);
  const config = getConfig(network);
  if (!config) {
    return [];
  }
  const traderPoolsIds = config.pools
    .filter((pool) => pool.show.trader)
    .map((pool) => pool.id.toLowerCase());
  if (traderPoolsIds.length === 0) {
    return state.aMMs.aMMs[network];
  }
  return state.aMMs.aMMs[network].filter((amm) => traderPoolsIds.includes(amm.id.toLowerCase()));
};

export const selectBorrowAMMs = (state: RootState): BorrowAMM[] => {
  const network = selectNetwork(state);
  const aMMs = state.aMMs.aMMs[network];
  const borrowMarkets = aMMs.filter((amm) => isBorrowing(amm.rateOracle.protocolId));
  const liveBorrowMarkets = borrowMarkets.filter(
    (amm) => Date.now().valueOf() < amm.endDateTime.toMillis(),
  );
  return liveBorrowMarkets.map((amm) => new BorrowAMM({ id: amm.id, amm: amm }));
};

export const selectAMMsLoadedState = (state: RootState) => {
  const network = selectNetwork(state);
  return state.aMMs.aMMsLoadedState[network];
};
