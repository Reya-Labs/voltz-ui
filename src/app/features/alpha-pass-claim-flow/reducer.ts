import { createSlice } from '@reduxjs/toolkit';

import {
  claimAlphaPassThunk,
  fetchIsAlphaPassClaimedThunk,
  getAlphaPassCountThunk,
} from './thunks';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export type SliceState = {
  step:
    | 'fetchingClaimError'
    | 'fetchingClaimStatus'
    | 'claim'
    | 'claiming'
    | 'claim-dialog'
    | 'claimed';
  status: ThunkStatus;
  error: string | null;
  totalAlphaPass: number | null;
};

const initialState: SliceState = {
  step: 'fetchingClaimStatus',
  status: 'idle',
  error: null,
  totalAlphaPass: null,
};

const slice = createSlice({
  name: 'alphaPassClaimFlow',
  initialState,
  reducers: {
    openClaimDialogAction: (state) => {
      state.step = 'claim-dialog';
      state.error = '';
    },
    closeClaimDialogAction: (state) => {
      state.step = 'claim';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(claimAlphaPassThunk.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(claimAlphaPassThunk.rejected, (state, { payload }) => {
        state.status = 'error';
        state.step = 'claim-dialog';
        state.error = payload as string;
      })
      .addCase(claimAlphaPassThunk.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.step = 'claimed';
        state.error = null;
      })
      .addCase(fetchIsAlphaPassClaimedThunk.pending, (state) => {
        state.step = 'fetchingClaimStatus';
      })
      .addCase(fetchIsAlphaPassClaimedThunk.rejected, (state, { payload }) => {
        state.step = 'fetchingClaimError';
      })
      .addCase(fetchIsAlphaPassClaimedThunk.fulfilled, (state, { payload }) => {
        state.step = payload ? 'claimed' : 'claim';
      })
      .addCase(getAlphaPassCountThunk.pending, (state) => {
        state.totalAlphaPass = null;
      })
      .addCase(getAlphaPassCountThunk.rejected, (state, { payload }) => {
        state.totalAlphaPass = 0;
      })
      .addCase(getAlphaPassCountThunk.fulfilled, (state, { payload }) => {
        state.totalAlphaPass = payload as number;
      });
  },
});

export const { closeClaimDialogAction, openClaimDialogAction } = slice.actions;
export const alphaPassClaimFlowReducer = slice.reducer;
