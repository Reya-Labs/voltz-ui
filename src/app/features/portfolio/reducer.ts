import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getNextSortDirection } from '../helpers';
import { resetMarginAccountsSortingDirection, resetPositionsSortingDirection } from './constants';
import { initialState } from './state';
import {
  fetchMarginAccountPositionsThunk,
  fetchMarginAccountsThunk,
  fetchPortfolioSummaryThunk,
  initialisePortfolioPositionsThunk,
  PortfolioPosition,
  PortfolioSummary,
  ReturnTypeFetchMarginAccounts,
} from './thunks';
import { PositionSortId } from './types';

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
        ...resetPositionsSortingDirection,
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
      })
      .addCase(fetchPortfolioSummaryThunk.pending, (state) => {
        state.portfolioSummaryLoadedState = 'pending';
        state.portfolioSummary = null;
      })
      .addCase(fetchPortfolioSummaryThunk.rejected, (state) => {
        state.portfolioSummaryLoadedState = 'failed';
        state.portfolioSummary = null;
      })
      .addCase(fetchPortfolioSummaryThunk.fulfilled, (state, { payload }) => {
        state.portfolioSummaryLoadedState = 'succeeded';
        state.portfolioSummary = payload as PortfolioSummary;
      })
      .addCase(fetchMarginAccountsThunk.pending, (state) => {
        state.marginAccountsLoadedState = 'pending';
        state.marginAccounts = [];
      })
      .addCase(fetchMarginAccountsThunk.rejected, (state) => {
        state.marginAccountsLoadedState = 'failed';
        state.marginAccounts = [];
      })
      .addCase(fetchMarginAccountsThunk.fulfilled, (state, { meta, payload }) => {
        state.marginAccountsLoadedState = 'succeeded';
        const { marginAccounts, totalMarginAccounts } = payload as ReturnTypeFetchMarginAccounts;
        state.marginAccounts = marginAccounts;
        state.totalMarginAccounts = totalMarginAccounts;
        if (meta.arg.sort) {
          const { id, direction } = meta.arg.sort;
          state.marginAccountsSortingDirection = {
            ...resetMarginAccountsSortingDirection,
            [id]: direction,
          };
        }
      })
      .addCase(fetchMarginAccountPositionsThunk.pending, (state, { meta }) => {
        state.marginAccountsPositions[meta.arg.id] = {
          status: 'pending',
          positions: [],
        };
      })
      .addCase(fetchMarginAccountPositionsThunk.rejected, (state, { meta }) => {
        state.marginAccountsPositions[meta.arg.id] = {
          status: 'failed',
          positions: [],
        };
      })
      .addCase(fetchMarginAccountPositionsThunk.fulfilled, (state, { meta, payload }) => {
        state.marginAccountsPositions[meta.arg.id] = {
          status: 'succeeded',
          positions: payload as PortfolioPosition[],
        };
      });
  },
});

export const { resetPortfolioStateAction, togglePositionSortingDirectionAction } = slice.actions;
export const portfolioReducer = slice.reducer;
