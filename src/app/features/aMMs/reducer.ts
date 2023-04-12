import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AMM, getAMMs, SupportedChainId } from '@voltz-protocol/v1-sdk';
import { providers } from 'ethers';

import {
  initialFilters,
  initialSortingDirection,
  PoolFilterId,
  PoolFilters,
  PoolSortDirection,
  PoolSortId,
  PoolSorting,
  resetSortingDirection,
} from './constants';
import { initialiseAMMsThunk } from './thunks';

type SliceState = {
  aMMsLoadedState: Record<SupportedChainId, 'idle' | 'pending' | 'succeeded' | 'failed'>;
  aMMs: Record<SupportedChainId, AMM[]>;
  filters: Record<SupportedChainId, PoolFilters>;
  sortingDirection: Record<SupportedChainId, PoolSorting>;
};

const initialState: SliceState = {
  aMMsLoadedState: {
    [SupportedChainId.mainnet]: 'idle',
    [SupportedChainId.goerli]: 'idle',
    [SupportedChainId.arbitrum]: 'idle',
    [SupportedChainId.arbitrumGoerli]: 'idle',
  },
  aMMs: {
    [SupportedChainId.mainnet]: [],
    [SupportedChainId.goerli]: [],
    [SupportedChainId.arbitrum]: [],
    [SupportedChainId.arbitrumGoerli]: [],
  },
  filters: {
    [SupportedChainId.mainnet]: { ...initialFilters },
    [SupportedChainId.goerli]: { ...initialFilters },
    [SupportedChainId.arbitrum]: { ...initialFilters },
    [SupportedChainId.arbitrumGoerli]: { ...initialFilters },
  },
  sortingDirection: {
    [SupportedChainId.mainnet]: { ...initialSortingDirection },
    [SupportedChainId.goerli]: { ...initialSortingDirection },
    [SupportedChainId.arbitrum]: { ...initialSortingDirection },
    [SupportedChainId.arbitrumGoerli]: { ...initialSortingDirection },
  },
};

export const slice = createSlice({
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
      state.aMMs[chainId].forEach((aMM) => (aMM.signer = signer));
    },
    togglePoolFilterAction: (
      state,
      {
        payload: { chainId, filterId },
      }: PayloadAction<{
        chainId: SupportedChainId;
        filterId: PoolFilterId;
      }>,
    ) => {
      state.filters[chainId][filterId] = !state.filters[chainId][filterId];
    },
    togglePoolSortingDirectionAction: (
      state,
      {
        payload: { chainId, sortId },
      }: PayloadAction<{
        chainId: SupportedChainId;
        sortId: PoolSortId;
      }>,
    ) => {
      let nextSort: PoolSortDirection = 'noSort';
      const currentSort = state.sortingDirection[chainId][sortId];
      if (currentSort === 'noSort') {
        nextSort = 'ascending';
      }
      if (currentSort === 'ascending') {
        nextSort = 'descending';
      }
      if (currentSort === 'descending') {
        nextSort = 'ascending';
      }

      state.sortingDirection[chainId] = {
        ...resetSortingDirection,
        [sortId]: nextSort,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialiseAMMsThunk.pending, (state, { meta }) => {
        state.aMMsLoadedState[meta.arg.chainId] = 'pending';
      })
      .addCase(initialiseAMMsThunk.rejected, (state, { meta }) => {
        state.aMMsLoadedState[meta.arg.chainId] = 'failed';
        state.aMMs[meta.arg.chainId] = [];
      })
      .addCase(initialiseAMMsThunk.fulfilled, (state, { payload, meta }) => {
        state.aMMsLoadedState[meta.arg.chainId] = 'succeeded';
        state.aMMs[meta.arg.chainId] = payload as Awaited<ReturnType<typeof getAMMs>>['amms'];
      });
  },
});

export const { togglePoolSortingDirectionAction, setSignerForAMMsAction, togglePoolFilterAction } =
  slice.actions;
export const aMMsReducer = slice.reducer;
