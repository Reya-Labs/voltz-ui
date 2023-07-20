import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { getHistoricalRates, Granularity } from '@voltz-protocol/v1-sdk';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers';
import { CACHE, getCacheId } from './cache';

export type FetchHistoricalRatesThunkParams = {
  isFixed: boolean;
  poolId: string;
  timeframeMs: number;
  granularity: Granularity;
};

export const fetchHistoricalRatesThunkHandler: AsyncThunkPayloadCreator<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  {
    isFixed: boolean;
    poolId: string;
    timeframeMs: number;
    granularity: Granularity;
  },
  { state: RootState }
> = async (payload, thunkAPI) => {
  const cacheId = getCacheId(payload);
  if (CACHE[cacheId] && CACHE[cacheId].historicalRates.length !== 0) {
    return CACHE[cacheId];
  }
  const { timeframeMs, granularity, poolId, isFixed } = payload;
  try {
    const { historicalRates } = await getHistoricalRates({
      poolId,
      isFixed,
      filters: {
        granularity,
        timeframeMs,
      },
    });

    CACHE[cacheId] = {
      historicalRates,
    };
    return CACHE[cacheId];
  } catch (err) {
    return rejectThunkWithError(thunkAPI, err);
  }
};

export const fetchHistoricalRatesThunk = createAsyncThunk<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  FetchHistoricalRatesThunkParams,
  { state: RootState }
>('historicalRates/fetch', fetchHistoricalRatesThunkHandler);
