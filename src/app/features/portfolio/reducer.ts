import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getNextSortDirection } from '../helpers';
import { initialSortingDirection, resetSortingDirection } from './constants';
import { initialisePortfolioPositionsThunk, PortfolioPosition } from './thunks';
import { PositionSortId, PositionSorting } from './types';

type SliceState = {
  positionsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  positions: PortfolioPosition[];
  sortingDirection: PositionSorting;
};

const initialState: SliceState = {
  positionsLoadedState: 'idle',
  positions: [],
  sortingDirection: { ...initialSortingDirection },
};

const slice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    resetPortfolioStateAction: () => initialState,
    togglePositionSortingDirectionAction: (
      state,
      {
        payload: { sortId },
      }: PayloadAction<{
        sortId: PositionSortId;
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
        state.positions = payload as PortfolioPosition[];
      });
  },
});

export const { resetPortfolioStateAction, togglePositionSortingDirectionAction } = slice.actions;
export const portfolioReducer = slice.reducer;
