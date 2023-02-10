import { createSlice } from '@reduxjs/toolkit';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { getDefaultChainId } from '../../../components/interface/NetworkSelector/get-default-chain-id';
import { setChainIdThunk } from './thunks';

type SliceState = {
  chainId: SupportedChainId;
  isSupportedNetwork: boolean;
  networkChangeState: 'idle' | 'pending' | 'error' | 'success';
};

const initialState: SliceState = {
  chainId: getDefaultChainId(),
  isSupportedNetwork: true,
  networkChangeState: 'idle',
};

export const slice = createSlice({
  name: 'network',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setChainIdThunk.pending, (state) => {
        state.networkChangeState = 'pending';
      })
      .addCase(setChainIdThunk.rejected, (state, { meta }) => {
        state.networkChangeState = 'error';
      })
      .addCase(setChainIdThunk.fulfilled, (state, { meta }) => {
        state.chainId = meta.arg.chainId;
        state.isSupportedNetwork = meta.arg.isSupportedNetwork;
        state.networkChangeState = 'success';
      });
  },
});

export const networkReducer = slice.reducer;
