import { createSlice } from '@reduxjs/toolkit';
import { SupportedChainId, Voyage } from '@voltz-protocol/v1-sdk';

import { initialState } from './state';
import { fetchVoyageBadgesThunk } from './thunks';

export const getVoyageId = ({ chainId, account }: { chainId: SupportedChainId; account: string }) =>
  `${chainId}-${account}`;

const slice = createSlice({
  name: 'voyage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVoyageBadgesThunk.pending, (state, { meta }) => {
        state.status[getVoyageId(meta.arg)] = 'pending';
      })
      .addCase(fetchVoyageBadgesThunk.rejected, (state, { meta }) => {
        state.status[getVoyageId(meta.arg)] = 'failed';
        state.badges[getVoyageId(meta.arg)] = [];
      })
      .addCase(fetchVoyageBadgesThunk.fulfilled, (state, { payload, meta }) => {
        state.status[getVoyageId(meta.arg)] = 'succeeded';
        state.badges[getVoyageId(meta.arg)] = payload as Voyage[];
      });
  },
});

export const voyageReducer = slice.reducer;
