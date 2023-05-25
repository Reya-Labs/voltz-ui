import { MarketTokenInformationProps } from '../../../ui/components/MarketTokenInformation';
import { generateAmmIdForRoute, generatePoolId } from '../../../utilities/amm';
import { formatPOSIXTimestamp } from '../../../utilities/date';
import { formatNumber, stringToBigFloat } from '../../../utilities/number';
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
    const aMM = position.amm;

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
      chainId: aMM.chainId,
      variableAPYRateFormatted: formatNumber(variableAPYRate),
      variableAPYRate,
      routeAmmId: generateAmmIdForRoute(aMM),
      routePoolId: generatePoolId(aMM),
      name: `${market} - ${token as string}`,
    };
  });

  return sortPositions(pools, {
    marginSortingDirection: appliedSortingDirection['margin'],
    notionalSortingDirection: appliedSortingDirection['notional'],
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
