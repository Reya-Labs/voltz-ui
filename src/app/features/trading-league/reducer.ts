import { createSlice } from '@reduxjs/toolkit';
import { RankType, SupportedChainId } from '@voltz-protocol/v1-sdk';

import { fetchRankingsThunk } from './thunks';

type SliceState = {
  status: Record<SupportedChainId, 'idle' | 'pending' | 'succeeded' | 'failed'>;
  rankings: Record<SupportedChainId, RankType[]>;
};

const initialState: SliceState = {
  status: {
    [SupportedChainId.mainnet]: 'idle',
    [SupportedChainId.goerli]: 'idle',
    [SupportedChainId.arbitrum]: 'idle',
    [SupportedChainId.arbitrumGoerli]: 'idle',
  },
  rankings: {
    [SupportedChainId.mainnet]: [],
    [SupportedChainId.goerli]: [],
    [SupportedChainId.arbitrum]: [],
    [SupportedChainId.arbitrumGoerli]: [],
  },
};

export const slice = createSlice({
  name: 'tradingLeague',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRankingsThunk.pending, (state, { meta }) => {
        state.status[meta.arg.chainId] = 'pending';
      })
      .addCase(fetchRankingsThunk.rejected, (state, { meta }) => {
        state.status[meta.arg.chainId] = 'failed';
        state.rankings[meta.arg.chainId] = [];
      })
      .addCase(fetchRankingsThunk.fulfilled, (state, { payload, meta }) => {
        state.status[meta.arg.chainId] = 'succeeded';
        state.rankings[meta.arg.chainId] = payload as RankType[];
      });
  },
});

export const tradingLeagueReducer = slice.reducer;
