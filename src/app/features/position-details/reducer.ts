import { createSlice } from '@reduxjs/toolkit';
import { PortfolioPositionDetails } from '@voltz-protocol/v1-sdk';

import { PositionUI } from '../portfolio/types';
import { fetchPositionDetailsThunk } from './thunks';

type ThunkStatus = 'idle' | 'pending' | 'success' | 'error';

export type SliceState = {
  details: Record<
    PositionUI['id'],
    {
      status: ThunkStatus;
      value: PortfolioPositionDetails | null;
    }
  >;
};

const initialState: SliceState = {
  details: {},
};

const slice = createSlice({
  name: 'positionDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPositionDetailsThunk.pending, (state, { meta }) => {
        state.details[meta.arg.positionId] = {
          value: null,
          status: 'pending',
        };
      })
      .addCase(fetchPositionDetailsThunk.rejected, (state, { meta }) => {
        state.details[meta.arg.positionId] = {
          value: null,
          status: 'error',
        };
      })
      .addCase(fetchPositionDetailsThunk.fulfilled, (state, { payload, meta }) => {
        state.details[meta.arg.positionId] = {
          value: payload as PortfolioPositionDetails,
          status: 'success',
        };
      });
  },
});

export const positionDetailsReducer = slice.reducer;
