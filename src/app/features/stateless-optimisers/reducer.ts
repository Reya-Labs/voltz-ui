import { createSlice } from '@reduxjs/toolkit';

import { depositOptimisersThunk, getOptimisersDepositGasFeeThunk, initialiseOptimisersThunk } from './thunks';
import { OptimiserInfo } from './types';

type SliceState = {
  optimisersLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  optimisers: OptimiserInfo[];

  depositLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';

  depositGasFeeLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  depositGasFee: number;
};

const initialState: SliceState = {
  optimisersLoadedState: 'idle',
  optimisers: [],
  depositLoadedState: 'idle',
  depositGasFeeLoadedState: 'idle',
  depositGasFee: 0,
};

export const slice = createSlice({
  name: 'stateless-optimisers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initialiseOptimisersThunk.pending, (state) => {
        state.optimisersLoadedState = 'pending';
      })
      .addCase(initialiseOptimisersThunk.rejected, (state) => {
        state.optimisersLoadedState = 'failed';
        state.optimisers = [];
      })
      .addCase(initialiseOptimisersThunk.fulfilled, (state, action) => {
        state.optimisersLoadedState = 'succeeded';
        state.optimisers = action.payload as OptimiserInfo[];
      })
      .addCase(depositOptimisersThunk.pending, (state) => {
        state.depositLoadedState = 'pending';
      })
      .addCase(depositOptimisersThunk.rejected, (state) => {
        state.depositLoadedState = 'failed';
      })
      .addCase(depositOptimisersThunk.fulfilled, (state, action) => {
        state.depositLoadedState = 'succeeded';
        const routerId = action.meta.arg.routerId

        const optimiserIndex = state.optimisers.findIndex((optimiser) => optimiser.routerId === routerId);
        if (optimiserIndex >= 0) {
          state.optimisers[optimiserIndex] = action.payload as OptimiserInfo;
        }
      })
      .addCase(getOptimisersDepositGasFeeThunk.pending, (state) => {
        state.depositGasFeeLoadedState = 'pending';
        state.depositGasFee = 0;
      })
      .addCase(getOptimisersDepositGasFeeThunk.rejected, (state) => {
        state.depositGasFeeLoadedState = 'failed';
        state.depositGasFee = 0;
      })
      .addCase(getOptimisersDepositGasFeeThunk.fulfilled, (state, action) => {
        state.depositGasFeeLoadedState = 'succeeded';
        state.depositGasFee = action.payload as number;
      });
  },
});

export const statelessOptimisersReducer = slice.reducer;
