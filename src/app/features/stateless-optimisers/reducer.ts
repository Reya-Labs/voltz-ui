import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';

import { initialiseOptimisersThunk } from './thunks';
import { OptimiserInfo } from './types';

type SliceState = {
  optimisersLoadedState: Record<SupportedNetworksEnum, 'idle' | 'pending' | 'succeeded' | 'failed'>;
  optimisers: Record<SupportedNetworksEnum, OptimiserInfo[]>;
};

const initialState: SliceState = {
  optimisersLoadedState: {
    [SupportedNetworksEnum.mainnet]: 'idle',
    [SupportedNetworksEnum.goerli]: 'idle',
    [SupportedNetworksEnum.arbitrum]: 'idle',
    [SupportedNetworksEnum.arbitrumGoerli]: 'idle',
  },
  optimisers: {
    [SupportedNetworksEnum.mainnet]: [],
    [SupportedNetworksEnum.goerli]: [],
    [SupportedNetworksEnum.arbitrum]: [],
    [SupportedNetworksEnum.arbitrumGoerli]: [],
  },
};

export const slice = createSlice({
  name: 'stateless-optimisers',
  initialState,
  reducers: {
    updateOptimiserState: (
      state,
      {
        payload: { optimiserId, network, newOptimiserState },
      }: PayloadAction<{
        optimiserId: string;
        newOptimiserState: OptimiserInfo;
        network: SupportedNetworksEnum;
      }>,
    ) => {
      const optimiserIndex = state.optimisers[network].findIndex(
        (opt) => opt.optimiserId === optimiserId,
      );
      if (optimiserIndex >= 0) {
        state.optimisers[network][optimiserIndex] = newOptimiserState;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialiseOptimisersThunk.pending, (state, { meta }) => {
        state.optimisersLoadedState[meta.arg.network] = 'pending';
      })
      .addCase(initialiseOptimisersThunk.rejected, (state, { meta }) => {
        state.optimisersLoadedState[meta.arg.network] = 'failed';
        state.optimisers[meta.arg.network] = [];
      })
      .addCase(initialiseOptimisersThunk.fulfilled, (state, { payload, meta }) => {
        state.optimisersLoadedState[meta.arg.network] = 'succeeded';
        state.optimisers[meta.arg.network] = payload as OptimiserInfo[];
      });
  },
});

export const { updateOptimiserState } = slice.actions;
export const statelessOptimisersReducer = slice.reducer;
