import { AMM, BorrowAMM } from '@voltz-protocol/v1-sdk';

import { getConfig } from '../../../hooks/voltz-config/config';
import { MarketTokenInformationProps } from '../../../ui/components/MarketTokenInformation';
import { generateAmmIdForRoute, generatePoolId } from '../../../utilities/amm';
import { MATURITY_WINDOW } from '../../../utilities/constants';
import { formatPOSIXTimestamp } from '../../../utilities/date';
import { RootState } from '../../store';
import { selectChainId } from '../network';
import { FILTER_LABELS, PoolFilterId } from './constants';

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

export const selectPools = (
  state: RootState,
): {
  market: 'Aave' | 'Compound' | 'Lido' | 'Rocket' | 'GMX:GLP';
  token?: 'eth' | 'usdc' | 'usdt' | 'dai';
  isBorrowing: boolean;
  isAaveV3: boolean;
  fixedRateFormatted: string;
  aMMMaturity: string;
  id: string;
  variableRate24hDelta: number;
  variableRateFormatted: string;
  routeAmmId: string;
  routePoolId: string;
}[] => {
  const aMMs = selectAMMs(state);
  const appliedFilters = selectPoolFilters(state);
  if (!appliedFilters) {
    return [];
  }

  return (
    aMMs
      // TODO: Artur is it possible to be moved to SDK level (subgraph)?
      .filter((amm) => Date.now().valueOf() + MATURITY_WINDOW < amm.endDateTime.toMillis())
      .filter((amm) => {
        if (appliedFilters['eth'] && amm.isETH) {
          return true;
        }
        if (appliedFilters['borrow'] && amm.market.tags.isBorrowing) {
          return true;
        }
        // TODO: Artur to provide with functionality from SDK
        // if(appliedFilters['lending'] && amm.market.tags.isBorrowing) {
        //   return true;
        // }
        // TODO: Artur to provide with functionality from SDK
        // if(appliedFilters['staking'] && amm.market.tags.isBorrowing) {
        //   return true;
        // }
        return false;
      })
      .map((aMM) => {
        const isAaveV3 = aMM.market.tags.isAaveV3;
        const isBorrowing = aMM.market.tags.isBorrowing;
        const market = aMM.market.name as MarketTokenInformationProps['market'];
        const token =
          aMM.underlyingToken.name.toLowerCase() as MarketTokenInformationProps['token'];

        return {
          market,
          token,
          isBorrowing,
          isAaveV3,
          fixedRateFormatted: 'TODO',
          aMMMaturity: formatPOSIXTimestamp(aMM.termEndTimestampInMS),
          id: aMM.id,
          variableRate24hDelta: -1000,
          variableRateFormatted: 'TODO',
          routeAmmId: generateAmmIdForRoute(aMM),
          routePoolId: generatePoolId(aMM),
        };
      })
  );
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
