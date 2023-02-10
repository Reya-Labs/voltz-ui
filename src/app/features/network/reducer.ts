import { createSlice } from '@reduxjs/toolkit';
import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';

import { getDefaultNetworkId } from '../../../components/interface/NetworkSelector/get-default-network-id';
import { setNetworkThunk } from './thunks';

type SliceState = {
  network: SupportedNetworksEnum;
  isSupportedNetwork: boolean;
  networkChangeState: 'idle' | 'pending' | 'error' | 'success';
};

const initialState: SliceState = {
  network: getDefaultNetworkId(),
  isSupportedNetwork: true,
  networkChangeState: 'idle',
};

export const slice = createSlice({
  name: 'network',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setNetworkThunk.pending, (state, { meta }) => {
        state.network = meta.arg.network;
        state.isSupportedNetwork = meta.arg.isSupportedNetwork;
        state.networkChangeState = 'pending';
      })
      .addCase(setNetworkThunk.rejected, (state, { meta }) => {
        state.network = meta.arg.network;
        state.isSupportedNetwork = false;
        state.networkChangeState = 'error';
      })
      .addCase(setNetworkThunk.fulfilled, (state, { meta }) => {
        state.network = meta.arg.network;
        state.isSupportedNetwork = meta.arg.isSupportedNetwork;
        state.networkChangeState = 'success';
      });
  },
});

export const networkReducer = slice.reducer;
