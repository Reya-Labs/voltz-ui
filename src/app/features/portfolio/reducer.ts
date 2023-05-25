import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Position } from '@voltz-protocol/v1-sdk';

import { initialSortingDirection, resetSortingDirection } from './constants';
import { PositionSortDirection, PositionSortId, PositionSorting } from './types';

type SliceState = {
  positionsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  positions: Position[];
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
  extraReducers: (builder) => {},
});

export const { togglePositionSortingDirectionAction } = slice.actions;
export const portfolioReducer = slice.reducer;
