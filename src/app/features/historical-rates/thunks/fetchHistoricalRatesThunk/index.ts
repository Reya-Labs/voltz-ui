import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { getHistoricalRates, Granularity, SupportedChainId } from '@voltz-protocol/v1-sdk';

import { RootState } from '../../../../store';
import { rejectThunkWithError } from '../../../helpers/reject-thunk-with-error';
import { CACHE, getCacheId } from './cache';

export type FetchHistoricalRatesThunkParams = {
  chainId: SupportedChainId;
  isFixed: boolean;
  aMMId: string;
  aMMRateOracleId: string;
  timeframeMs: number;
  granularity: Granularity;
};

export const fetchHistoricalRatesThunkHandler: AsyncThunkPayloadCreator<
  Awaited<number | ReturnType<typeof rejectThunkWithError>>,
  {
    chainId: SupportedChainId;
    isFixed: boolean;
    aMMId: string;
    aMMRateOracleId: string;
    timeframeMs: number;
    granularity: Granularity;
  },
  { state: RootState }
> = async (payload, thunkAPI) => {
  const cacheId = getCacheId(payload);
  if (CACHE[cacheId] && CACHE[cacheId].historicalRates.length !== 0) {
    return CACHE[cacheId];
  }
  const { timeframeMs, granularity, chainId, aMMId, aMMRateOracleId, isFixed } = payload;
  try {
    const { historicalRates } = await getHistoricalRates({
      chainId,
      isFixed,
      filters: {
        granularity,
        timeframeMs,
      },
      ammId: aMMId,
      rateOracleId: aMMRateOracleId,
      historicalRatesApiKey: process.env.REACT_APP_RATES_API_KEY ?? '',
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
  {
    chainId: SupportedChainId;
    isFixed: boolean;
    aMMId: string;
    aMMRateOracleId: string;
    timeframeMs: number;
    granularity: Granularity;
  },
  { state: RootState }
>('historicalRates/fetch', fetchHistoricalRatesThunkHandler);
