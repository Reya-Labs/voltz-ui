import { formatPOSIXTimestamp } from '../../../utilities/date';
import { compactFormatToParts } from '../../../utilities/number';
import { RootState } from '../../store';
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
    const isV2 = position.isV2;
    const isAaveV3 = position.isAaveV3;
    const isBorrowing = position.isBorrowing;
    const market = position.market;
    const token = position.token;
    const notional = position.notional;
    const margin = position.margin;
    const type = position.type;
    const unrealizedPNL = position.unrealizedPNL;
    const realizedPNLTotal = position.realizedPNLTotal;
    const realizedPNLFees = position.realizedPNLFees;
    const realizedPNLCashflow = position.realizedPNLCashflow;

    return {
      type,
      market,
      token,
      isBorrowing,
      isAaveV3,
      isV2,
      marginCompactFormat: compactFormatToParts(margin),
      margin,
      notionalCompactFormat: compactFormatToParts(notional),
      notional,
      maturityEndTimestampInMS: position.termEndTimestampInMS,
      maturityStartTimestampInMS: position.termStartTimestampInMS,
      maturityFormatted: formatPOSIXTimestamp(position.termEndTimestampInMS),
      id: position.id,
      chainId: position.chainId,
      routeAmmId: 'todo:',
      routePoolId: 'todo:',
      name: `${type} - ${market}${isAaveV3 ? ' - Aave v3' : ''} - ${token as string}${
        isBorrowing ? ' - Borrowing' : ''
      }`,
      status: position.status,
      unrealizedPNL,
      unrealizedPNLCompactFormat: compactFormatToParts(unrealizedPNL),
      realizedPNLTotal,
      realizedPNLTotalCompactFormat: compactFormatToParts(realizedPNLTotal),
      realizedPNLFees,
      realizedPNLFeesCompactFormat: compactFormatToParts(realizedPNLFees),
      realizedPNLCashflow,
      realizedPNLCashflowCompactFormat: compactFormatToParts(realizedPNLCashflow),
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

export const selectPositionsLength = (state: RootState): string => {
  if (selectPositionsLoading(state)) {
    return '--';
  }
  return selectPositions(state).length.toString();
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
