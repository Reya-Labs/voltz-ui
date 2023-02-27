import { createSlice } from '@reduxjs/toolkit';
import {
  HistoricalRates,
  RatesData,
} from '@voltz-protocol/v1-sdk/src/entities/amm/getters/historicalRates/getHistoricalRate';

import { fetchHistoricalRatesThunk } from './thunks';

type SliceState = {
  historicalRates: HistoricalRates[];
  oppositeSideCurrentRate: number;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
};

const initialState: SliceState = {
  historicalRates: [],
  oppositeSideCurrentRate: -1,
  status: 'idle',
};

export const slice = createSlice({
  name: 'historicalRates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoricalRatesThunk.pending, (state, {}) => {
        state.status = 'pending';
      })
      .addCase(fetchHistoricalRatesThunk.rejected, (state, {}) => {
        state.status = 'failed';
        state.historicalRates = [];
        state.oppositeSideCurrentRate = -1;
      })
      .addCase(fetchHistoricalRatesThunk.fulfilled, (state, { payload }) => {
        state.historicalRates = (payload as RatesData).historicalRates;
        state.oppositeSideCurrentRate = (payload as RatesData).oppositeSideCurrentRate;
        state.status = 'succeeded';
      });
  },
});

export const historicalRatesReducer = slice.reducer;
