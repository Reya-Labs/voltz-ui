import { createSlice } from '@reduxjs/toolkit';
import { MellowProduct } from '@voltz-protocol/v1-sdk';

import { initialiseVaultsForSignerThunk, initialiseVaultsThunk } from './thunks';

type SliceState = {
  vaultsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  signerLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  selectedVaultId?: MellowProduct['id'];
  lpVaults: MellowProduct[];
};

const initialState: SliceState = {
  vaultsLoadedState: 'idle',
  signerLoadedState: 'idle',
  selectedVaultId: undefined,
  lpVaults: [],
};

export const slice = createSlice({
  name: 'lpOptimisers',
  initialState,
  reducers: {
    resetVaultsAction: (state) => {
      // TODO: Filip and Costin fix this by not keeping SDK stuff in UI
      state.lpVaults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialiseVaultsThunk.pending, (state) => {
        state.vaultsLoadedState = 'pending';
      })
      .addCase(initialiseVaultsThunk.rejected, (state) => {
        state.vaultsLoadedState = 'failed';
      })
      .addCase(initialiseVaultsThunk.fulfilled, (state) => {
        state.vaultsLoadedState = 'succeeded';
      })
      .addCase(initialiseVaultsForSignerThunk.pending, (state) => {
        state.signerLoadedState = 'pending';
      })
      .addCase(initialiseVaultsForSignerThunk.rejected, (state) => {
        state.signerLoadedState = 'failed';
      })
      .addCase(initialiseVaultsForSignerThunk.fulfilled, (state) => {
        state.signerLoadedState = 'succeeded';
      });
  },
});

export const { resetVaultsAction } = slice.actions;
export const lpOptimisersReducer = slice.reducer;
