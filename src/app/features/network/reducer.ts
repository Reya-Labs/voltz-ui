import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';

import { getDefaultNetworkId } from '../../../components/interface/NetworkSelector/get-default-network-id';

type SliceState = {
  network: SupportedNetworksEnum;
  isSupportedNetwork: boolean;
};

const initialState: SliceState = {
  network: getDefaultNetworkId(),
  isSupportedNetwork: true,
};

export const slice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetworkAction: (
      state,
      {
        payload: { network, isSupportedNetwork },
      }: PayloadAction<{
        network: SupportedNetworksEnum;
        isSupportedNetwork: boolean;
      }>,
    ) => {
      state.network = network;
      state.isSupportedNetwork = isSupportedNetwork;
    },
  },
});

export const { setNetworkAction } = slice.actions;
export const networkReducer = slice.reducer;
