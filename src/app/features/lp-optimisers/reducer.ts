import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { initialiseOptimisersThunk } from './thunks';
import { OptimiserInfo } from './types';

type SliceState = {
  optimisersLoadedState: Record<SupportedChainId, 'idle' | 'pending' | 'succeeded' | 'failed'>;
  optimisers: Record<SupportedChainId, OptimiserInfo[]>;
};

const initialState: SliceState = {
  optimisersLoadedState: {
    [SupportedChainId.mainnet]: 'idle',
    [SupportedChainId.goerli]: 'idle',
    [SupportedChainId.arbitrum]: 'idle',
    [SupportedChainId.arbitrumGoerli]: 'idle',
  },
  optimisers: {
    [SupportedChainId.mainnet]: [],
    [SupportedChainId.goerli]: [],
    [SupportedChainId.arbitrum]: [],
    [SupportedChainId.arbitrumGoerli]: [],
  },
};

export const slice = createSlice({
  name: 'lp-optimisers',
  initialState,
  reducers: {
    updateOptimiserState: (
      state,
      {
        payload: { optimiserId, chainId, newOptimiserState },
      }: PayloadAction<{
        optimiserId: string;
        newOptimiserState: OptimiserInfo;
        chainId: SupportedChainId;
      }>,
    ) => {
      const optimiserIndex = state.optimisers[chainId].findIndex(
        (opt) => opt.optimiserId === optimiserId,
      );
      if (optimiserIndex >= 0) {
        state.optimisers[chainId][optimiserIndex] = newOptimiserState;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialiseOptimisersThunk.pending, (state, { meta }) => {
        state.optimisersLoadedState[meta.arg.chainId] = 'pending';
      })
      .addCase(initialiseOptimisersThunk.rejected, (state, { meta }) => {
        state.optimisersLoadedState[meta.arg.chainId] = 'failed';
        state.optimisers[meta.arg.chainId] = [];
      })
      .addCase(initialiseOptimisersThunk.fulfilled, (state, { payload, meta }) => {
        state.optimisersLoadedState[meta.arg.chainId] = 'succeeded';
        state.optimisers[meta.arg.chainId] = payload as OptimiserInfo[];
      });
  },
});

export const { updateOptimiserState } = slice.actions;
export const lpOptimisersReducer = slice.reducer;
