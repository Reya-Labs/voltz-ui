import { createSlice } from '@reduxjs/toolkit';

import { verifyAdmitPassThunk } from './thunks';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export type SliceState = {
  step: 'verify' | 'no-admit-pass-found' | 'admit-pass-found';
  status: ThunkStatus;
  error: string | null;
};

const initialState: SliceState = {
  step: 'verify',
  status: 'idle',
  error: null,
};

const slice = createSlice({
  name: 'admitPassVerificationFlow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyAdmitPassThunk.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(verifyAdmitPassThunk.rejected, (state, { payload }) => {
        state.status = 'error';
        state.step = 'verify';
        state.error = payload as string;
      })
      .addCase(verifyAdmitPassThunk.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.step = (payload as boolean) ? 'admit-pass-found' : 'no-admit-pass-found';
        state.error = null;
      });
  },
});

export const admitPassVerificationFlowReducer = slice.reducer;
