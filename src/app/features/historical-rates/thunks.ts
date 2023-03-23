import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getHistoricalRates,
  Granularity,
  RatesData,
  SupportedChainId,
} from '@voltz-protocol/v1-sdk';

import { RootState } from '../../store';

const rejectThunkWithError = (
  thunkAPI: {
    rejectWithValue: (value: string | undefined) => unknown;
  },
  err: unknown,
) => {
  if (typeof err === 'string') {
    return thunkAPI.rejectWithValue(err);
  }
  return thunkAPI.rejectWithValue((err as Error)?.message);
};

type FetchHistoricalRatesThunk = {
  chainId: SupportedChainId;
  isFixed: boolean;
  aMMId: string;
  aMMRateOracleId: string;
  timeframeMs: number;
  granularity: Granularity;
};

const getCacheId = ({
  chainId,
  isFixed,
  aMMId,
  aMMRateOracleId,
  timeframeMs,
  granularity,
}: FetchHistoricalRatesThunk) =>
  `${chainId}-${isFixed.toString()}-${aMMRateOracleId}-${aMMId}-${timeframeMs}-${granularity.toString()}`;
const CACHE: Record<string, RatesData> = {};

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
>('historicalRates/fetch', async (payload, thunkAPI) => {
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
});
