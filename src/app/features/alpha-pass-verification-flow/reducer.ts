import { createSlice } from '@reduxjs/toolkit';

import { verifyAlphaPassThunk } from './thunks';

export type SliceState = {
  step: Record<string, 'idle' | 'verifying' | 'verified' | 'verification-error' | 'not-verified'>;
  error: Record<string, string | null>;
};

const initialState: SliceState = {
  step: {},
  error: {},
};

const slice = createSlice({
  name: 'alphaPassVerificationFlow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyAlphaPassThunk.pending, (state, { meta }) => {
        state.step[meta.arg.account] = 'verifying';
        state.error[meta.arg.account] = null;
      })
      .addCase(verifyAlphaPassThunk.rejected, (state, { meta, payload }) => {
        state.step[meta.arg.account] = 'verification-error';
        state.error[meta.arg.account] = payload as string;
      })
      .addCase(verifyAlphaPassThunk.fulfilled, (state, { meta, payload }) => {
        state.step[meta.arg.account] = (payload as boolean) ? 'verified' : 'not-verified';
        state.error[meta.arg.account] = null;
      });
  },
});

export const alphaPassVerificationFlowReducer = slice.reducer;
