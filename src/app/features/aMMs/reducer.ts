import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AMM, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import { getNextSortDirection } from '../helpers';
import {
  initialFilters,
  initialPoolsInformation,
  initialSortingDirection,
  resetSortingDirection,
} from './constants';
import {
  fetchPoolsInformationThunk,
  initialiseAMMsThunk,
  initialisePoolsThunk,
  V2Pool,
} from './thunks';
import { PoolFilterId, PoolFilters, PoolsInformation, PoolSortId, PoolSorting } from './types';

type SliceState = {
  aMMsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  aMMs: AMM[];
  filters: PoolFilters;
  sortingDirection: PoolSorting;
  poolsInformationLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  poolsInformation: PoolsInformation;
  poolsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  pools: V2Pool[];
};

const initialState: SliceState = {
  aMMsLoadedState: 'idle',
  aMMs: [],
  poolsLoadedState: 'idle',
  pools: [],
  filters: { ...initialFilters },
  sortingDirection: { ...initialSortingDirection },
  poolsInformationLoadedState: 'idle',
  poolsInformation: { ...initialPoolsInformation },
};

const slice = createSlice({
  name: 'aMMs',
  initialState,
  reducers: {
    setSignerForAMMsAction: (
      state,
      {
        payload: { signer, chainId },
      }: PayloadAction<{
        signer: providers.JsonRpcSigner | null;
        chainId: SupportedChainId;
      }>,
    ) => {
      state.aMMs.filter((aMM) => aMM.chainId === chainId).forEach((aMM) => (aMM.signer = signer));
    },
    togglePoolFilterAction: (
      state,
      {
        payload: { filterId },
      }: PayloadAction<{
        filterId: PoolFilterId;
      }>,
    ) => {
      state.filters[filterId] = !state.filters[filterId];
    },
    togglePoolSortingDirectionAction: (
      state,
      {
        payload: { sortId },
      }: PayloadAction<{
        sortId: PoolSortId;
      }>,
    ) => {
      state.sortingDirection = {
        ...resetSortingDirection,
        [sortId]: getNextSortDirection(state.sortingDirection[sortId]),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialiseAMMsThunk.pending, (state) => {
        state.aMMsLoadedState = 'pending';
      })
      .addCase(initialiseAMMsThunk.rejected, (state) => {
        state.aMMsLoadedState = 'failed';
        state.aMMs = [];
      })
      .addCase(initialiseAMMsThunk.fulfilled, (state, { payload }) => {
        state.aMMsLoadedState = 'succeeded';
        state.aMMs = payload as AMM[];
      })
      .addCase(initialisePoolsThunk.pending, (state) => {
        state.poolsLoadedState = 'pending';
      })
      .addCase(initialisePoolsThunk.rejected, (state) => {
        state.poolsLoadedState = 'failed';
        state.pools = [];
      })
      .addCase(initialisePoolsThunk.fulfilled, (state, { payload }) => {
        state.poolsLoadedState = 'succeeded';
        state.pools = payload as V2Pool[];
      })
      .addCase(fetchPoolsInformationThunk.pending, (state) => {
        state.poolsInformationLoadedState = 'pending';
      })
      .addCase(fetchPoolsInformationThunk.rejected, (state) => {
        state.poolsInformationLoadedState = 'failed';
        state.poolsInformation = {
          ...initialPoolsInformation,
        };
      })
      .addCase(fetchPoolsInformationThunk.fulfilled, (state, { payload }) => {
        state.poolsInformationLoadedState = 'succeeded';
        state.poolsInformation = payload as PoolsInformation;
      });
  },
});

export const { togglePoolSortingDirectionAction, setSignerForAMMsAction, togglePoolFilterAction } =
  slice.actions;
export const aMMsReducer = slice.reducer;
