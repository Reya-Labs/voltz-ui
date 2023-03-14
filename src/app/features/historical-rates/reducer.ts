import { createSlice } from '@reduxjs/toolkit';
import {
  HistoricalRates,
  RatesData,
} from '@voltz-protocol/v1-sdk/src/entities/amm/getters/historicalRates/getHistoricalRate';

import { fetchHistoricalRatesThunk } from './thunks';

type SliceState = {
  historicalRates: HistoricalRates[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
};

const initialState: SliceState = {
  historicalRates: [],
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
      })
      .addCase(fetchHistoricalRatesThunk.fulfilled, (state, { payload }) => {
        state.historicalRates = (payload as RatesData).historicalRates;
        state.status = 'succeeded';
      });
  },
});

export const historicalRatesReducer = slice.reducer;
