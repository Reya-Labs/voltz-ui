import { AMM } from '@voltz-protocol/v1-sdk';

import { getConfig } from '../../../hooks/voltz-config/config';
import { MarketTokenInformationProps } from '../../../ui/components/MarketTokenInformation';
import { generateAmmIdForRoute, generatePoolId } from '../../../utilities/amm';
import { formatPOSIXTimestamp } from '../../../utilities/date';
import { getMaturityWindow } from '../../../utilities/maturityWindow';
import { compactFormatToParts, formatNumber, stringToBigFloat } from '../../../utilities/number';
import { RootState } from '../../store';
import { selectChainId } from '../network';
import { FILTER_CONFIG, SORT_CONFIG } from './constants';
import { sortPools } from './helpers/sortPools';
import { PoolFilterId, PoolSortDirection, PoolSortId, PoolUI } from './types';

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

export const selectPools = (state: RootState): PoolUI[] => {
  const aMMs = selectAMMs(state);
  const appliedFilters = selectPoolFilters(state);
  const appliedSortingDirection = selectPoolSortingDirection(state);
  if (!appliedFilters || !appliedSortingDirection) {
    return [];
  }

  const pools = aMMs
    .filter(
      (amm) =>
        Date.now().valueOf() + getMaturityWindow(amm.rateOracle.protocolId) <
        amm.endDateTime.toMillis(),
    )
    .filter((amm) => {
      if (appliedFilters['borrow'] && amm.market.tags.isBorrowing) {
        return true;
      }
      if (appliedFilters['v2'] && amm.market.tags.isV2) {
        return true;
      }
      if (appliedFilters['yield'] && amm.market.tags.isYield) {
        return true;
      }
      return false;
    })
    .map((aMM) => {
      const isV2 = aMM.market.tags.isV2;
      const isAaveV3 = aMM.market.tags.isAaveV3;
      const isBorrowing = aMM.market.tags.isBorrowing;
      const market = aMM.market.name as MarketTokenInformationProps['market'];
      const token = aMM.underlyingToken.name.toLowerCase() as MarketTokenInformationProps['token'];
      const fixedAPRRate = aMM.fixedApr;
      const variableAPYRate = aMM.variableApy;
      const variableApy24Ago = aMM.variableApy24Ago;

      return {
        market,
        token,
        isBorrowing,
        isAaveV3,
        isV2,
        fixedAPRRateFormatted: formatNumber(fixedAPRRate),
        fixedAPRRate,
        maturityTimestampInMS: aMM.termEndTimestampInMS,
        aMMMaturity: formatPOSIXTimestamp(aMM.termEndTimestampInMS),
        id: aMM.id,
        variableAPYRate24hDelta: stringToBigFloat(
          formatNumber(variableAPYRate - variableApy24Ago, 0, 3),
        ),
        variableAPYRateFormatted: formatNumber(variableAPYRate),
        variableAPYRate,
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
  const loadedState = selectAMMsLoadedState(state);
  return loadedState === 'idle' || loadedState === 'pending';
};

const selectPoolsInformationLoading = (state: RootState): boolean => {
  const loadedState = selectPoolsInformationLoadedState(state);
  return loadedState === 'idle' || loadedState === 'pending';
};

export const selectPoolsSize = (state: RootState): string => {
  if (selectPoolsLoading(state)) {
    return '--';
  }
  return selectPools(state).length.toString();
};

export const selectVolume30DaysFormatted = (
  state: RootState,
): ReturnType<typeof compactFormatToParts> => {
  const chainId = selectChainId(state);
  if (selectPoolsInformationLoading(state) || !chainId) {
    return {
      compactNumber: '--',
      compactSuffix: '',
    };
  }
  const compactFormat = compactFormatToParts(
    state.aMMs.poolsInformation[chainId].volume30DayInDollars,
  );
  return {
    compactNumber: `$${compactFormat.compactNumber}`,
    compactSuffix: compactFormat.compactSuffix,
  };
};

export const selectTotalLiquidityFormatted = (
  state: RootState,
): ReturnType<typeof compactFormatToParts> => {
  const chainId = selectChainId(state);
  if (selectPoolsInformationLoading(state) || !chainId) {
    return {
      compactNumber: '--',
      compactSuffix: '',
    };
  }
  const compactFormat = compactFormatToParts(
    state.aMMs.poolsInformation[chainId].totalLiquidityInDollars,
  );
  return {
    compactNumber: `$${compactFormat.compactNumber}`,
    compactSuffix: compactFormat.compactSuffix,
  };
};

const selectPoolFilters = (state: RootState) => {
  const chainId = selectChainId(state);
  if (!chainId) {
    return undefined;
  }
  return state.aMMs.filters[chainId];
};

const selectPoolSortingDirection = (state: RootState) => {
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
  return Object.keys(filters)
    .filter((filterKey) => !FILTER_CONFIG[filterKey as PoolFilterId].hidden)
    .map((filterKey) => ({
      id: filterKey as PoolFilterId,
      label: FILTER_CONFIG[filterKey as PoolFilterId].label,
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
  disabled: boolean;
}[] => {
  const chainId = selectChainId(state);
  if (!chainId) {
    return [];
  }
  const sortingDirection = state.aMMs.sortingDirection[chainId];
  return Object.keys(sortingDirection).map((sortKey) => ({
    id: sortKey as PoolSortId,
    text: SORT_CONFIG[sortKey as PoolSortId].text,
    subtext: SORT_CONFIG[sortKey as PoolSortId].subtext,
    direction: sortingDirection[sortKey as PoolSortId],
    disabled: SORT_CONFIG[sortKey as PoolSortId].disabled,
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

export const selectAMMsLoadedState = (state: RootState) => {
  const chainId = selectChainId(state);
  if (!chainId) {
    return 'idle';
  }
  return state.aMMs.aMMsLoadedState[chainId];
};

export const selectPoolsInformationLoadedState = (state: RootState) => {
  const chainId = selectChainId(state);
  if (!chainId) {
    return 'idle';
  }
  return state.aMMs.poolsInformationLoadedState[chainId];
};
