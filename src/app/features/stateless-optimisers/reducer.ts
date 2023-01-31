import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const statelessOptimisersReducer = slice.reducer;
