import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';

import { getDefaultNetworkId } from '../../../components/interface/NetworkSelector/get-default-network-id';

type SliceState = {
  network: SupportedNetworksEnum;
};

const initialState: SliceState = {
  network: getDefaultNetworkId(),
};

export const slice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetworkAction: (
      state,
      {
        payload: { network },
      }: PayloadAction<{
        network: SupportedNetworksEnum;
      }>,
    ) => {
      state.network = network;
    },
  },
});

export const { setNetworkAction } = slice.actions;
export const networkReducer = slice.reducer;
