import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AMM, getAMMs } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { initialiseAMMsThunk } from './thunks';

type SliceState = {
  aMMsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  aMMs: AMM[];
};

const initialState: SliceState = {
  aMMsLoadedState: 'idle',
  aMMs: [],
};

export const slice = createSlice({
  name: 'aMMs',
  initialState,
  reducers: {
    setSignerForAMMsAction: (
      state,
      action: PayloadAction<{
        signer: providers.JsonRpcSigner | null;
      }>,
    ) => {
      state.aMMs.forEach((aMM) => (aMM.signer = action.payload.signer));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialiseAMMsThunk.pending, (state) => {
        state.aMMsLoadedState = 'pending';
      })
      .addCase(initialiseAMMsThunk.rejected, (state) => {
        state.aMMsLoadedState = 'failed';
      })
      .addCase(initialiseAMMsThunk.fulfilled, (state, action) => {
        const { amms, error } = action.payload as Awaited<ReturnType<typeof getAMMs>>;
        if (error) {
          state.aMMsLoadedState = 'failed';
          return;
        }
        state.aMMsLoadedState = 'succeeded';
        state.aMMs = amms;
      });
  },
});

export const { setSignerForAMMsAction } = slice.actions;
export const aMMsReducer = slice.reducer;