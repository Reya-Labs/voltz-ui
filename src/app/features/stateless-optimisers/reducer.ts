import { createSlice } from '@reduxjs/toolkit';

import { depositOptimisersThunk, initialiseOptimisersThunk } from './thunks';
import { OptimiserInfo } from './types';

type SliceState = {
  optimisersLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  optimisers: OptimiserInfo[];

  depositLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  depositError: string;
};

const initialState: SliceState = {
  optimisersLoadedState: 'idle',
  optimisers: [],

  depositLoadedState: 'idle',
  depositError: '',
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
      });
  },
});

export const statelessOptimisersReducer = slice.reducer;
