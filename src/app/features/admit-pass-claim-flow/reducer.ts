import { createSlice } from '@reduxjs/toolkit';

import { claimAdmitPassThunk, getAdmitPassCountThunk } from './thunks';
import { fetchIsAdmitPassClaimedThunk } from './thunks/fetchIsAdmitPassClaimedThunk';

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
  totalAdmitPass: number | null;
};

const initialState: SliceState = {
  step: 'fetchingClaimStatus',
  status: 'idle',
  error: null,
  totalAdmitPass: null,
};

const slice = createSlice({
  name: 'admitPassClaimFlow',
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
      .addCase(claimAdmitPassThunk.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(claimAdmitPassThunk.rejected, (state, { payload }) => {
        state.status = 'error';
        state.step = 'claim-dialog';
        state.error = payload as string;
      })
      .addCase(claimAdmitPassThunk.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.step = 'claimed';
        state.error = null;
      })
      .addCase(fetchIsAdmitPassClaimedThunk.pending, (state) => {
        state.step = 'fetchingClaimStatus';
      })
      .addCase(fetchIsAdmitPassClaimedThunk.rejected, (state, { payload }) => {
        state.step = 'fetchingClaimError';
      })
      .addCase(fetchIsAdmitPassClaimedThunk.fulfilled, (state, { payload }) => {
        state.step = payload ? 'claimed' : 'claim';
      })
      .addCase(getAdmitPassCountThunk.pending, (state) => {
        state.totalAdmitPass = null;
      })
      .addCase(getAdmitPassCountThunk.rejected, (state, { payload }) => {
        state.totalAdmitPass = 0;
      })
      .addCase(getAdmitPassCountThunk.fulfilled, (state, { payload }) => {
        state.totalAdmitPass = payload as number;
      });
  },
});

export const { closeClaimDialogAction, openClaimDialogAction } = slice.actions;
export const admitPassClaimFlowReducer = slice.reducer;
