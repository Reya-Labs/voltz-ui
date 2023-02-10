import { createSlice } from '@reduxjs/toolkit';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { setChainIdThunk } from './thunks';

type SliceState = {
  chainId: SupportedChainId | null;
  isSupportedChain: boolean;
  chainChangeState: 'idle' | 'pending' | 'error' | 'success';
};

const initialState: SliceState = {
  chainId: null,
  isSupportedChain: true,
  chainChangeState: 'idle',
};

export const slice = createSlice({
  name: 'network',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setChainIdThunk.pending, (state) => {
        state.chainChangeState = 'pending';
      })
      .addCase(setChainIdThunk.rejected, (state) => {
        state.chainChangeState = 'error';
      })
      .addCase(setChainIdThunk.fulfilled, (state, { meta }) => {
        state.chainId = meta.arg.chainId;
        state.isSupportedChain = meta.arg.isSupportedChain;
        state.chainChangeState = 'success';
      });
  },
});

export const networkReducer = slice.reducer;
