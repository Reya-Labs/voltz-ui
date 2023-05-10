import { RatesData } from '@voltz-protocol/v1-sdk';

import { FetchHistoricalRatesThunkParams } from './index';

export const getCacheId = ({
  chainId,
  isFixed,
  aMMId,
  aMMRateOracleId,
  timeframeMs,
  granularity,
}: FetchHistoricalRatesThunkParams) =>
  `${chainId}-${isFixed.toString()}-${aMMRateOracleId}-${aMMId}-${timeframeMs}-${granularity.toString()}`;

export const CACHE: Record<string, RatesData> = {};
