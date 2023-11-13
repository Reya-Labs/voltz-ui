import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './state';
import {
  fetchMarginAccountsForSwapLPThunk,
  ReturnTypeFetchMarginAccountsForSwapLP,
} from './thunks';

const slice = createSlice({
  name: 'marginAccountsForSwapLpReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarginAccountsForSwapLPThunk.pending, (state) => {
        state.marginAccountsForSelectionLoadedState = 'pending';
        state.marginAccountsForSelection = [];
      })
      .addCase(fetchMarginAccountsForSwapLPThunk.rejected, (state, { meta }) => {
        state.marginAccountsForSelectionLoadedState = 'failed';
        state.marginAccountsForSelection = [];
      })
      .addCase(fetchMarginAccountsForSwapLPThunk.fulfilled, (state, { meta, payload }) => {
        state.marginAccountsForSelectionLoadedState = 'succeeded';
        const { marginAccounts } = payload as ReturnTypeFetchMarginAccountsForSwapLP;
        state.marginAccountsForSelection = marginAccounts;
        state.poolToken = meta.arg.poolToken;
      });
  },
});

export const marginAccountsForSwapLpReducer = slice.reducer;
