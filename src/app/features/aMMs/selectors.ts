import { AMM } from '@voltz-protocol/v1-sdk';

import { MarketTokenInformationProps } from '../../../ui/components/MarketTokenInformation';
import { generateAmmIdForRoute, generatePoolId, isV2AMM } from '../../../utilities/amm';
import { formatPOSIXTimestamp } from '../../../utilities/date';
import { isOnlyV2PoolsPositions } from '../../../utilities/is-only-v2-pools-positions';
import { getMaturityWindow } from '../../../utilities/maturityWindow';
import { compactFormatToParts, formatNumber, stringToBigFloat } from '../../../utilities/number';
import { RootState } from '../../store';
import { selectChainId } from '../network';
import { FILTER_CONFIG, SORT_CONFIG } from './constants';
import { filterByChain, filterByTag, sortPools } from './helpers';
import { PoolFilterId, PoolSortDirection, PoolSortId, PoolUI } from './types';

export const selectAMMs = (state: RootState): AMM[] => {
  if (isOnlyV2PoolsPositions()) {
    return state.aMMs.aMMs.filter((amm) => isV2AMM(amm));
  }
  return state.aMMs.aMMs;
};

export const selectPoolsOnCurrentChain = (state: RootState): PoolUI[] => {
  const chainId = selectChainId(state);
  if (!chainId) {
    return [];
  }
  const pools = selectPools(state);
  return pools.filter((p) => p.chainId === chainId);
};

export const selectPools = (state: RootState): PoolUI[] => {
  const aMMs = selectAMMs(state);
  const appliedFilters = state.aMMs.filters;
  const appliedSortingDirection = state.aMMs.sortingDirection;
  if (!appliedFilters || !appliedSortingDirection) {
    return [];
  }

  const pools: PoolUI[] = aMMs
    .filter(
      (amm) =>
        Date.now().valueOf() + getMaturityWindow(amm.rateOracle.protocolId) <
        amm.endDateTime.toMillis(),
    )
    .filter((amm) => filterByChain(amm, appliedFilters))
    .filter((amm) => filterByTag(amm, appliedFilters))
    .map((aMM) => {
      const isV2 = aMM.market.tags.isV2;
      const isAaveV3 = aMM.market.tags.isAaveV3;
      const isBorrowing = aMM.market.tags.isBorrowing;
      const market = aMM.market.name as NonNullable<MarketTokenInformationProps['market']>;
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
        chainId: aMM.chainId,
        variableAPYRateFormatted: formatNumber(variableAPYRate),
        variableAPYRate,
        routeAmmId: generateAmmIdForRoute(aMM),
        routePoolId: generatePoolId(aMM),
        name: `${market as string} - ${token as string}`,
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
  if (selectPoolsInformationLoading(state)) {
    return {
      compactNumber: '--',
      compactSuffix: '',
    };
  }
  const compactFormat = compactFormatToParts(state.aMMs.poolsInformation.volume30DayInDollars);
  return {
    compactNumber: `$${compactFormat.compactNumber}`,
    compactSuffix: compactFormat.compactSuffix,
  };
};

export const selectTotalLiquidityFormatted = (
  state: RootState,
): ReturnType<typeof compactFormatToParts> => {
  if (selectPoolsInformationLoading(state)) {
    return {
      compactNumber: '--',
      compactSuffix: '',
    };
  }
  const compactFormat = compactFormatToParts(state.aMMs.poolsInformation.totalLiquidityInDollars);
  return {
    compactNumber: `$${compactFormat.compactNumber}`,
    compactSuffix: compactFormat.compactSuffix,
  };
};

export const selectPoolFilterOptions = (
  state: RootState,
): {
  id: PoolFilterId;
  label: string;
  isActive: boolean;
}[] => {
  const filters = state.aMMs.filters;
  return Object.keys(filters)
    .filter((filterKey) => !FILTER_CONFIG[filterKey as PoolFilterId].hidden)
    .sort(
      (filterKeyA, filterKeyB) =>
        FILTER_CONFIG[filterKeyA as PoolFilterId].sortOrder -
        FILTER_CONFIG[filterKeyB as PoolFilterId].sortOrder,
    )
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
  const sortingDirection = state.aMMs.sortingDirection;
  return Object.keys(sortingDirection).map((sortKey) => ({
    id: sortKey as PoolSortId,
    text: SORT_CONFIG[sortKey as PoolSortId].text,
    subtext: SORT_CONFIG[sortKey as PoolSortId].subtext,
    direction: sortingDirection[sortKey as PoolSortId],
    disabled: SORT_CONFIG[sortKey as PoolSortId].disabled,
  }));
};

export const selectAMMsLoadedState = (state: RootState) => {
  return state.aMMs.aMMsLoadedState;
};

export const selectPoolsInformationLoadedState = (state: RootState) => {
  return state.aMMs.poolsInformationLoadedState;
};
