import { createSlice } from '@reduxjs/toolkit';

import { verifyAlphaPassThunk } from './thunks';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export type SliceState = {
  step: Record<string, 'verify' | 'no-alpha-pass-found' | 'alpha-pass-found'>;
  status: Record<string, ThunkStatus>;
  error: Record<string, string | null>;
};

const initialState: SliceState = {
  step: {},
  status: {},
  error: {},
};

const slice = createSlice({
  name: 'alphaPassVerificationFlow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyAlphaPassThunk.pending, (state, { meta }) => {
        state.status[meta.arg.account] = 'pending';
        state.error[meta.arg.account] = null;
      })
      .addCase(verifyAlphaPassThunk.rejected, (state, { meta, payload }) => {
        state.status[meta.arg.account] = 'error';
        state.step[meta.arg.account] = 'verify';
        state.error[meta.arg.account] = payload as string;
      })
      .addCase(verifyAlphaPassThunk.fulfilled, (state, { meta, payload }) => {
        state.status[meta.arg.account] = 'success';
        state.step[meta.arg.account] = (payload as boolean)
          ? 'alpha-pass-found'
          : 'no-alpha-pass-found';
        state.error[meta.arg.account] = null;
      });
  },
});

export const alphaPassVerificationFlowReducer = slice.reducer;
