import { createSlice } from '@reduxjs/toolkit';

import { claimAdmitPassThunk } from './thunks';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export type SliceState = {
  step: 'claim' | 'claiming' | 'claim-dialog' | 'claimed';
  status: ThunkStatus;
  error: string | null;
};

const initialState: SliceState = {
  step: 'claim',
  status: 'idle',
  error: null,
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
      });
  },
});

export const { closeClaimDialogAction, openClaimDialogAction } = slice.actions;
export const admitPassClaimFlowReducer = slice.reducer;
