import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initialSortingDirection, resetSortingDirection } from './constants';
import { initialisePortfolioPositionsThunk, PositionMock } from './thunks';
import { PositionSortDirection, PositionSortId, PositionSorting } from './types';

type SliceState = {
  positionsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  positions: PositionMock[];
  sortingDirection: PositionSorting;
};

const initialState: SliceState = {
  positionsLoadedState: 'idle',
  positions: [],
  sortingDirection: { ...initialSortingDirection },
};

const slice = createSlice({
  name: 'aMMs',
  initialState,
  reducers: {
    togglePositionSortingDirectionAction: (
      state,
      {
        payload: { sortId },
      }: PayloadAction<{
        sortId: PositionSortId;
      }>,
    ) => {
      let nextSort: PositionSortDirection = 'noSort';
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
      .addCase(initialisePortfolioPositionsThunk.pending, (state) => {
        state.positionsLoadedState = 'pending';
        state.positions = [];
      })
      .addCase(initialisePortfolioPositionsThunk.rejected, (state) => {
        state.positionsLoadedState = 'failed';
        state.positions = [];
      })
      .addCase(initialisePortfolioPositionsThunk.fulfilled, (state, { payload }) => {
        state.positionsLoadedState = 'succeeded';
        state.positions = payload as PositionMock[];
      });
  },
});

export const { togglePositionSortingDirectionAction } = slice.actions;
export const portfolioReducer = slice.reducer;
