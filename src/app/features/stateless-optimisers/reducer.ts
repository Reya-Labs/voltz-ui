import { createSlice } from '@reduxjs/toolkit';

import {
  depositOptimisersThunk,
  getOptimisersDepositGasFeeThunk,
  initialiseOptimisersThunk,
  rolloverOptimisersThunk,
  withdrawOptimisersThunk,
} from './thunks';
import { OptimiserInfo } from './types';

type SliceState = {
  optimisersLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  optimisers: OptimiserInfo[];

  depositLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  depositError: string;

  depositGasFeeLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  depositGasFee: number;

  withdrawLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  withdrawError: string;

  rolloverLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  rolloverError: string;
};

const initialState: SliceState = {
  optimisersLoadedState: 'idle',
  optimisers: [],

  depositLoadedState: 'idle',
  depositError: '',

  depositGasFeeLoadedState: 'idle',
  depositGasFee: 0,

  withdrawLoadedState: 'idle',
  withdrawError: '',

  rolloverLoadedState: 'idle',
  rolloverError: '',
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
      .addCase(depositOptimisersThunk.rejected, (state, action) => {
        state.depositLoadedState = 'failed';
        state.depositError = `Deposit failed. ${action.error.message ?? ''}`;
      })
      .addCase(depositOptimisersThunk.fulfilled, (state, action) => {
        state.depositLoadedState = 'succeeded';
        const optimiserId = action.meta.arg.optimiserId;

        const optimiserIndex = state.optimisers.findIndex(
          (optimiser) => optimiser.optimiserId === optimiserId,
        );
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
      })
      .addCase(withdrawOptimisersThunk.pending, (state) => {
        state.withdrawLoadedState = 'pending';
      })
      .addCase(withdrawOptimisersThunk.rejected, (state, action) => {
        state.withdrawLoadedState = 'failed';
        state.withdrawError = `Withdraw failed. ${action.error.message ?? ''}`;
      })
      .addCase(withdrawOptimisersThunk.fulfilled, (state, action) => {
        state.withdrawLoadedState = 'succeeded';
        const optimiserId = action.meta.arg.optimiserId;

        const optimiserIndex = state.optimisers.findIndex(
          (optimiser) => optimiser.optimiserId === optimiserId,
        );
        if (optimiserIndex >= 0) {
          state.optimisers[optimiserIndex] = action.payload as OptimiserInfo;
        }
      })
      .addCase(rolloverOptimisersThunk.pending, (state) => {
        state.rolloverLoadedState = 'pending';
      })
      .addCase(rolloverOptimisersThunk.rejected, (state, action) => {
        state.rolloverLoadedState = 'failed';
        state.rolloverError = `Rollover failed. ${action.error.message ?? ''}`;
      })
      .addCase(rolloverOptimisersThunk.fulfilled, (state, action) => {
        state.rolloverLoadedState = 'succeeded';
        const optimiserId = action.meta.arg.optimiserId;

        const optimiserIndex = state.optimisers.findIndex(
          (optimiser) => optimiser.optimiserId === optimiserId,
        );
        if (optimiserIndex >= 0) {
          state.optimisers[optimiserIndex] = action.payload as OptimiserInfo;
        }
      });
  },
});

export const statelessOptimisersReducer = slice.reducer;
