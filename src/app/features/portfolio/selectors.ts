import { isOnlyV2PoolsPositions } from '../../../utilities/is-only-v2-pools-positions';
import { compactFormatToParts } from '../../../utilities/number';
import { RootState } from '../../store';
import { formFormatNumber } from '../forms/common';
import {
  defaultPortfolioSummaryFormatted,
  defaultPositionsSummaryFormatted,
  SORT_CONFIG,
} from './constants';
import { getPositionsSummary, mapPortfolioPositionToPortfolioUI, sortPositions } from './helpers';
import {
  PortfolioSummaryFormatted,
  PositionSortDirection,
  PositionSortId,
  PositionsSummaryFormatted,
  PositionUI,
} from './types';

export const selectPositions = (state: RootState): PositionUI[] => {
  const portfolioPositions = state.portfolio.positions;
  const appliedSortingDirection = state.portfolio.sortingDirection;
  if (!appliedSortingDirection) {
    return [];
  }

  const pools: PositionUI[] = portfolioPositions
    .filter((p) => (isOnlyV2PoolsPositions() ? p.pool.isV2 : true))
    .map(mapPortfolioPositionToPortfolioUI);

  return sortPositions(pools, {
    marginSortingDirection: appliedSortingDirection['margin'],
    notionalSortingDirection: appliedSortingDirection['notional'],
    statusSortingDirection: appliedSortingDirection['status'],
    nameSortingDirection: appliedSortingDirection['name'],
    maturitySortingDirection: appliedSortingDirection['maturity'],
    unrealizedPNLSortingDirection: appliedSortingDirection['unrealizedPNL'],
    realizedPNLSortingDirection: appliedSortingDirection['realizedPNL'],
  });
};

export const selectPositionsLoading = (state: RootState): boolean => {
  const loadedState = selectPositionsLoadedState(state);
  return loadedState === 'idle' || loadedState === 'pending';
};

export const selectPositionsSummary = (state: RootState): PositionsSummaryFormatted => {
  if (selectPositionsLoading(state)) {
    return defaultPositionsSummaryFormatted;
  }

  const positions = selectPositions(state);
  const {
    maturedPositionsLength,
    activePositionsLength,
    settledPositionsLength,
    healthyPositionsLength,
    dangerPositionsLength,
    warningPositionsLength,
    totalPortfolioMarginValueUSD,
    totalPortfolioRealizedPNLValueUSD,
    totalPortfolioNotionalValueUSD,
    totalPortfolioUnrealizedPNLValueUSD,
  } = getPositionsSummary(positions);

  return {
    positionsLength: positions.length.toString(),
    activePositionsLength: activePositionsLength.toString(),
    settledPositionsLength: settledPositionsLength.toString(),
    maturedPositionsLength: maturedPositionsLength.toString(),
    healthyPositionsLength: healthyPositionsLength.toString(),
    dangerPositionsLength: dangerPositionsLength.toString(),
    warningPositionsLength: warningPositionsLength.toString(),
    totalPortfolioMarginValueUSDFormatted: formFormatNumber(totalPortfolioMarginValueUSD),
    totalPortfolioNotionalValueUSDCompactFormatted: compactFormatToParts(
      totalPortfolioNotionalValueUSD,
    ),
    totalPortfolioRealizedPNLValueUSDFormatted: formFormatNumber(totalPortfolioRealizedPNLValueUSD),
    totalPortfolioUnrealizedPNLValueUSDFormatted: formFormatNumber(
      totalPortfolioUnrealizedPNLValueUSD,
    ),
    totalPortfolioValueUSDFormatted: formFormatNumber(
      totalPortfolioMarginValueUSD +
        totalPortfolioUnrealizedPNLValueUSD +
        totalPortfolioRealizedPNLValueUSD,
    ),
    filterOptions: [
      {
        id: 'active',
        label: 'Active',
        attentionPrefixText: activePositionsLength.toString(),
      },
      {
        id: 'matured',
        label: 'To settle',
        attentionPrefixText: maturedPositionsLength.toString(),
      },
      {
        id: 'settled',
        label: 'Settled',
        attentionPrefixText: settledPositionsLength.toString(),
      },
    ],
  };
};

export const selectPositionsSortOptions = (
  state: RootState,
): {
  id: PositionSortId;
  text: string;
  subtext?: string;
  direction: PositionSortDirection;
  disabled: boolean;
}[] => {
  const sortingDirection = state.portfolio.sortingDirection;
  return Object.keys(sortingDirection).map((sortKey) => ({
    id: sortKey as PositionSortId,
    text: SORT_CONFIG[sortKey as PositionSortId].text,
    subtext: SORT_CONFIG[sortKey as PositionSortId].subtext,
    direction: sortingDirection[sortKey as PositionSortId],
    disabled: SORT_CONFIG[sortKey as PositionSortId].disabled,
  }));
};

export const selectPositionsLoadedState = (state: RootState) => {
  return state.portfolio.positionsLoadedState;
};

export const selectPortfolioSummaryLoadedState = (state: RootState) => {
  return state.portfolio.portfolioSummaryLoadedState;
};

export const selectPortfolioSummaryLoading = (state: RootState): boolean => {
  const loadedState = selectPortfolioSummaryLoadedState(state);
  return loadedState === 'idle' || loadedState === 'pending';
};

export const selectPortfolioSummary = (state: RootState) => {
  return state.portfolio.portfolioSummary;
};

export const selectPortfolioSummaryFormatted = (state: RootState): PortfolioSummaryFormatted => {
  const summary = selectPortfolioSummary(state);
  if (summary === null || selectPortfolioSummaryLoading(state)) {
    return defaultPortfolioSummaryFormatted;
  }
  const {
    healthyPositionsLength,
    warningPositionsLength,
    dangerPositionsLength,
    totalPortfolioCollateralValueUSD,
    totalPortfolioRealizedPNLValueUSD,
    totalPortfolioMarginValueUSD,
    totalPortfolioNotionalValueUSD,
    totalPortfolioUnrealizedPNLValueUSD,
    distributions,
  } = summary;
  return {
    healthyPositionsLength: healthyPositionsLength.toString(),
    dangerPositionsLength: dangerPositionsLength.toString(),
    warningPositionsLength: warningPositionsLength.toString(),
    totalPortfolioMarginValueUSDFormatted: formFormatNumber(totalPortfolioMarginValueUSD),
    totalPortfolioNotionalValueUSDCompactFormatted: compactFormatToParts(
      totalPortfolioNotionalValueUSD,
    ),
    totalPortfolioRealizedPNLValueUSDFormatted: formFormatNumber(totalPortfolioRealizedPNLValueUSD),
    totalPortfolioUnrealizedPNLValueUSDFormatted: formFormatNumber(
      totalPortfolioUnrealizedPNLValueUSD,
    ),
    totalPortfolioValueUSDFormatted: formFormatNumber(
      totalPortfolioMarginValueUSD +
        totalPortfolioUnrealizedPNLValueUSD +
        totalPortfolioRealizedPNLValueUSD,
    ),
    totalPortfolioCollateralUSDCompactFormatted: compactFormatToParts(
      totalPortfolioCollateralValueUSD,
    ),
    distributions: distributions.slice(),
  };
};
