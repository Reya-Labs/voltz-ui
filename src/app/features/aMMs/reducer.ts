import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AMM, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import {
  initialFilters,
  initialPoolsInformation,
  initialSortingDirection,
  resetSortingDirection,
} from './constants';
import { fetchPoolsInformationThunk, initialiseAMMsThunk } from './thunks';
import {
  PoolFilterId,
  PoolFilters,
  PoolsInformation,
  PoolSortDirection,
  PoolSortId,
  PoolSorting,
} from './types';

type SliceState = {
  aMMsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  aMMs: AMM[];
  filters: PoolFilters;
  sortingDirection: PoolSorting;
  poolsInformationLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  poolsInformation: PoolsInformation;
};

const initialState: SliceState = {
  aMMsLoadedState: 'idle',
  aMMs: [],
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
      let nextSort: PoolSortDirection = 'noSort';
      const currentSort = state.sortingDirection[sortId];
      if (currentSort === 'noSort') {
        nextSort = 'ascending';
      }
      if (currentSort === 'ascending') {
        nextSort = 'descending';
      }
      if (currentSort === 'descending') {
        nextSort = 'ascending';
      }

      state.sortingDirection = {
        ...resetSortingDirection,
        [sortId]: nextSort,
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
