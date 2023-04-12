import { AMM, BorrowAMM } from '@voltz-protocol/v1-sdk';

import { getConfig } from '../../../hooks/voltz-config/config';
import { MarketTokenInformationProps } from '../../../ui/components/MarketTokenInformation';
import { generateAmmIdForRoute, generatePoolId } from '../../../utilities/amm';
import { MATURITY_WINDOW } from '../../../utilities/constants';
import { formatPOSIXTimestamp } from '../../../utilities/date';
import { formatNumber, stringToBigFloat } from '../../../utilities/number';
import { RootState } from '../../store';
import { selectChainId } from '../network';
import {
  FILTER_LABELS,
  PoolFilterId,
  PoolSortDirection,
  PoolSortId,
  SORT_LABELS,
} from './constants';
import { sortPools } from './helpers/sortPools';
import { PoolUI } from './types';

export const selectAMMs = (state: RootState): AMM[] => {
  const chainId = selectChainId(state);
  if (!chainId) {
    return [];
  }
  const config = getConfig(chainId);
  if (!config) {
    return [];
  }
  const generalPoolIds = config.apply
    ? config.pools.filter((pool) => pool.show.general).map((pool) => pool.id.toLowerCase())
    : [];
  if (generalPoolIds.length === 0) {
    return state.aMMs.aMMs[chainId];
  }
  return state.aMMs.aMMs[chainId].filter((amm) => generalPoolIds.includes(amm.id.toLowerCase()));
};

// TODO: Artur remove once SDK
const cacheFixed: Record<string, number> = {};
const cacheVariable: Record<string, number> = {};

export const selectPools = (state: RootState): PoolUI[] => {
  const aMMs = selectAMMs(state);
  const appliedFilters = selectPoolFilters(state);
  const appliedSortingDirection = selectPoolSortingDirection(state);
  if (!appliedFilters || !appliedSortingDirection) {
    return [];
  }
  const maturityEndMilliseconds = Date.now().valueOf() + MATURITY_WINDOW;

  const pools = aMMs
    // TODO: Artur is it possible to be moved to SDK level (subgraph)?
    .filter((amm) => maturityEndMilliseconds < amm.endDateTime.toMillis())
    .filter((amm) => {
      if (appliedFilters['borrow'] && amm.market.tags.isBorrowing) {
        return true;
      }
      if (appliedFilters['v2'] && amm.market.tags.isV2) {
        return true;
      }
      // TODO: Artur to provide with functionality from SDK
      // if(appliedFilters['lending'] && amm.market.tags.isBorrowing) {
      //   return true;
      // }
      return false;
    })
    .map((aMM) => {
      const isV2 = aMM.market.tags.isV2;
      const isAaveV3 = aMM.market.tags.isAaveV3;
      const isBorrowing = aMM.market.tags.isBorrowing;
      const market = aMM.market.name as MarketTokenInformationProps['market'];
      const token = aMM.underlyingToken.name.toLowerCase() as MarketTokenInformationProps['token'];
      cacheFixed[aMM.id] = cacheFixed[aMM.id] || Math.random() * 100;
      cacheVariable[aMM.id] = cacheVariable[aMM.id] || Math.random() * 100;
      const fixedRate = cacheFixed[aMM.id];
      const variableRate = cacheVariable[aMM.id];

      return {
        market,
        token,
        isBorrowing,
        isAaveV3,
        isV2,
        // TODO: Artur to provide SDK
        fixedRateFormatted: fixedRate.toFixed(2),
        fixedRate: fixedRate,
        maturityTimestampInMS: aMM.termEndTimestampInMS,
        aMMMaturity: formatPOSIXTimestamp(aMM.termEndTimestampInMS),
        id: aMM.id,
        // TODO: Artur to provide SDK
        variableRate24hDelta: stringToBigFloat(
          formatNumber(Math.random() * 10 * (Math.random() * 10 > 5 ? -1 : 1), 0, 3),
        ),
        variableRateFormatted: variableRate.toFixed(2),
        variableRate,
        routeAmmId: generateAmmIdForRoute(aMM),
        routePoolId: generatePoolId(aMM),
        name: `${market} - ${token as string}`,
      };
    });

  return sortPools(pools, {
    nameSortingDirection: appliedSortingDirection['pools'],
    fixedAPRSortingDirection: appliedSortingDirection['fixedAPR'],
    variableAPYSortingDirection: appliedSortingDirection['variableAPY'],
    maturitySortingDirection: appliedSortingDirection['maturity'],
  });
};

export const selectPoolsLoading = (state: RootState): boolean => {
  const aMMsLoadedState = selectAMMsLoadedState(state);
  return aMMsLoadedState === 'idle' || aMMsLoadedState === 'pending';
};

export const selectPoolsSize = (state: RootState): string => {
  if (selectPoolsLoading(state)) {
    return '--';
  }
  return selectPools(state).length.toString();
};

export const selectPoolFilters = (state: RootState) => {
  const chainId = selectChainId(state);
  if (!chainId) {
    return undefined;
  }
  return state.aMMs.filters[chainId];
};

export const selectPoolSortingDirection = (state: RootState) => {
  const chainId = selectChainId(state);
  if (!chainId) {
    return undefined;
  }
  return state.aMMs.sortingDirection[chainId];
};

export const selectPoolFilterOptions = (
  state: RootState,
): {
  id: PoolFilterId;
  label: string;
  isActive: boolean;
}[] => {
  const chainId = selectChainId(state);
  if (!chainId) {
    return [];
  }
  const filters = state.aMMs.filters[chainId];
  return Object.keys(filters).map((filterKey) => ({
    id: filterKey as PoolFilterId,
    label: FILTER_LABELS[filterKey as PoolFilterId],
    isActive: filters[filterKey as PoolFilterId],
  }));
};

export const selectPoolSortOptions = (
  state: RootState,
): {
  id: PoolSortId;
  text: string;
  subtext?: string;
  direction: PoolSortDirection;
}[] => {
  const chainId = selectChainId(state);
  if (!chainId) {
    return [];
  }
  const sortingDirection = state.aMMs.sortingDirection[chainId];
  return Object.keys(sortingDirection).map((sortKey) => ({
    id: sortKey as PoolSortId,
    text: SORT_LABELS[sortKey as PoolSortId].text,
    subtext: SORT_LABELS[sortKey as PoolSortId].subtext,
    direction: sortingDirection[sortKey as PoolSortId],
  }));
};

export const selectTraderAMMs = (state: RootState): AMM[] => {
  const chainId = selectChainId(state);
  if (!chainId) {
    return [];
  }
  const config = getConfig(chainId);
  if (!config) {
    return [];
  }
  const traderPoolsIds = config.pools
    .filter((pool) => pool.show.trader)
    .map((pool) => pool.id.toLowerCase());
  if (traderPoolsIds.length === 0) {
    return state.aMMs.aMMs[chainId];
  }
  return state.aMMs.aMMs[chainId].filter((amm) => traderPoolsIds.includes(amm.id.toLowerCase()));
};

export const selectBorrowAMMs = (state: RootState): BorrowAMM[] => {
  const chainId = selectChainId(state);
  if (!chainId) {
    return [];
  }
  const aMMs = state.aMMs.aMMs[chainId];
  const borrowMarkets = aMMs.filter((amm) => amm.market.tags.isBorrowing);
  const liveBorrowMarkets = borrowMarkets.filter(
    (amm) => Date.now().valueOf() < amm.endDateTime.toMillis(),
  );
  return liveBorrowMarkets.map((amm) => new BorrowAMM({ id: amm.id, amm: amm }));
};

export const selectAMMsLoadedState = (state: RootState) => {
  const chainId = selectChainId(state);
  if (!chainId) {
    return 'idle';
  }
  return state.aMMs.aMMsLoadedState[chainId];
};
