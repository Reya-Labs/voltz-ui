import {
  generateAmmIdForRoute,
  generatePoolId,
  generatePositionIdForRoute,
} from '../../../utilities/amm';
import { formatPOSIXTimestamp } from '../../../utilities/date';
import { compactFormatToParts } from '../../../utilities/number';
import { RootState } from '../../store';
import { formFormatNumber } from '../forms/common/utils';
import { SORT_CONFIG } from './constants';
import { sortPositions } from './helpers/sortPositions';
import { PositionSortDirection, PositionSortId, PositionUI } from './types';

export const selectPositions = (state: RootState): PositionUI[] => {
  const portfolioPositions = state.portfolio.positions;
  const appliedSortingDirection = state.portfolio.sortingDirection;
  if (!appliedSortingDirection) {
    return [];
  }

  const pools: PositionUI[] = portfolioPositions.map((position) => {
    const isV2 = false;
    const isAaveV3 = position.amm.market === 'Aave V3';
    const isBorrowing = position.amm.isBorrowing;
    const market =
      position.amm.market === 'Aave V3' || position.amm.market === 'Aave V2'
        ? 'Aave'
        : position.amm.market;
    const token = position.amm.underlyingToken.name;
    const notionalUSD = position.notional * position.tokenPriceUSD;
    const marginUSD = position.margin * position.tokenPriceUSD;
    const type = position.type;
    const unrealizedPNLUSD = position.unrealizedPNL * position.tokenPriceUSD;
    const realizedPNLTotalUSD = position.realizedPNLTotal * position.tokenPriceUSD;
    const realizedPNLFeesUSD = position.realizedPNLFees * position.tokenPriceUSD;
    const realizedPNLCashflowUSD = position.realizedPNLCashflow * position.tokenPriceUSD;

    return {
      canEdit: position.canEdit,
      canSettle: position.canSettle,
      canRollover: Boolean(position.rolloverAmmId),
      type,
      market,
      token,
      isBorrowing,
      isAaveV3,
      isV2,
      marginUSDCompactFormat: compactFormatToParts(marginUSD),
      marginUSD,
      notionalUSDCompactFormat: compactFormatToParts(notionalUSD),
      notionalUSD,
      maturityEndTimestampInMS: position.amm.termEndTimestampInMS,
      maturityStartTimestampInMS: position.amm.termStartTimestampInMS,
      maturityFormatted: formatPOSIXTimestamp(position.amm.termEndTimestampInMS),
      id: position.id,
      chainId: position.amm.chainId,
      routeAmmId: generateAmmIdForRoute(position.amm),
      routePositionId: generatePositionIdForRoute(position),
      routePoolId: generatePoolId(position.amm),
      name: `${type} - ${market}${isAaveV3 ? ' - Aave v3' : ''} - ${token as string}${
        isBorrowing ? ' - Borrowing' : ''
      }`,
      status: {
        fixHigh: position.fixHigh,
        fixLow: position.fixLow,
        currentFixed: position.status.currentFixed,
        health: position.status.health,
        receiving: position.status.receiving,
        paying: position.status.paying,
        variant: position.status.variant,
      },
      unrealizedPNLUSD,
      unrealizedPNLUSDCompactFormat: compactFormatToParts(unrealizedPNLUSD),
      realizedPNLTotalUSD,
      realizedPNLTotalUSDCompactFormat: compactFormatToParts(realizedPNLTotalUSD),
      realizedPNLFeesUSD,
      realizedPNLFeesUSDCompactFormat: compactFormatToParts(realizedPNLFeesUSD),
      realizedPNLCashflowUSD,
      realizedPNLCashflowUSDCompactFormat: compactFormatToParts(realizedPNLCashflowUSD),
    };
  });

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

export const selectPositionsSummary = (
  state: RootState,
): {
  maturedPositionsLength: string;
  settledPositionsLength: string;
  activePositionsLength: string;
  positionsLength: string;
  healthyPositionsLength: string;
  warningPositionsLength: string;
  dangerPositionsLength: string;
  totalPortfolioValueUSDFormatted: string;
  totalPortfolioMarginValueUSDFormatted: string;
  totalPortfolioRealizedPNLValueUSDFormatted: string;
  totalPortfolioUnrealizedPNLValueUSDFormatted: string;
  totalPortfolioNotionalValueUSDCompactFormatted: {
    compactNumber: string;
    compactSuffix: string;
  };
} => {
  if (selectPositionsLoading(state)) {
    return {
      positionsLength: '--',
      activePositionsLength: '--',
      settledPositionsLength: '--',
      maturedPositionsLength: '--',
      healthyPositionsLength: '--',
      warningPositionsLength: '--',
      dangerPositionsLength: '--',
      totalPortfolioValueUSDFormatted: '--',
      totalPortfolioMarginValueUSDFormatted: '--',
      totalPortfolioRealizedPNLValueUSDFormatted: '--',
      totalPortfolioUnrealizedPNLValueUSDFormatted: '--',
      totalPortfolioNotionalValueUSDCompactFormatted: {
        compactNumber: '--',
        compactSuffix: '',
      },
    };
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
  } = positions.reduce(
    (summary, position) => {
      if (position.status.variant === 'active') {
        if (position.status.health === 'healthy') {
          summary.healthyPositionsLength++;
        } else if (position.status.health === 'danger') {
          summary.dangerPositionsLength++;
        } else if (position.status.health === 'warning') {
          summary.warningPositionsLength++;
        }
      }
      if (position.status.variant === 'active') {
        summary.activePositionsLength++;
      }
      if (position.status.variant === 'matured') {
        summary.maturedPositionsLength++;
      }
      if (position.status.variant === 'settled') {
        summary.settledPositionsLength++;
      }

      summary.totalPortfolioMarginValueUSD += position.marginUSD;
      summary.totalPortfolioRealizedPNLValueUSD += position.realizedPNLTotalUSD;
      summary.totalPortfolioNotionalValueUSD += position.notionalUSD;
      summary.totalPortfolioUnrealizedPNLValueUSD += position.unrealizedPNLUSD;

      return summary;
    },
    {
      maturedPositionsLength: 0,
      activePositionsLength: 0,
      settledPositionsLength: 0,
      healthyPositionsLength: 0,
      dangerPositionsLength: 0,
      warningPositionsLength: 0,
      totalPortfolioMarginValueUSD: 0,
      totalPortfolioRealizedPNLValueUSD: 0,
      totalPortfolioNotionalValueUSD: 0,
      totalPortfolioUnrealizedPNLValueUSD: 0,
    },
  );

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
