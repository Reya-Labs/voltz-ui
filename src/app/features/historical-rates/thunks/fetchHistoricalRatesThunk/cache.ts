import { RatesData } from '@voltz-protocol/v1-sdk';

import { FetchHistoricalRatesThunkParams } from './index';

export const getCacheId = ({
  isFixed,
  poolId,
  timeframeMs,
  granularity,
}: FetchHistoricalRatesThunkParams) =>
  `${isFixed.toString()}-${poolId}-${timeframeMs}-${granularity.toString()}`;

export const CACHE: Record<string, RatesData> = {};
