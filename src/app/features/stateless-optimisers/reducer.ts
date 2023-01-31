import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialiseOptimisersThunk } from './thunks';
import { OptimiserInfo } from './types';

type SliceState = {
  optimisersLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  optimisers: OptimiserInfo[];
};

const initialState: SliceState = {
  optimisersLoadedState: 'idle',
  optimisers: [],
};

export const slice = createSlice({
  name: 'stateless-optimisers',
  initialState,
  reducers: {
    updateOptimiserState: (
      state,
      action: PayloadAction<{
        optimiserId: string;
        newOptimiserState: OptimiserInfo;
      }>,
    ) => {
      const optimiserIndex = state.optimisers.findIndex(
        (opt) => opt.optimiserId === action.payload.optimiserId,
      );
      if (optimiserIndex >= 0) {
        state.optimisers[optimiserIndex] = action.payload.newOptimiserState;
      }
    },
  },
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
      });
  },
});

export const { updateOptimiserState } = slice.actions;
export const statelessOptimisersReducer = slice.reducer;
