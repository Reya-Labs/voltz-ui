import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getNextSortDirection } from '../helpers';
import { resetMarginAccountsSortingDirection, resetPositionsSortingDirection } from './constants';
import { initialState } from './state';
import {
  AvailableAmountForMarginAccount,
  createMarginAccountThunk,
  fetchAvailableAmountsToWithdrawForMarginAccountThunk,
  fetchMarginAccountPositionsThunk,
  fetchMarginAccountsThunk,
  fetchPortfolioSummaryThunk,
  initialisePortfolioPositionsThunk,
  PortfolioPosition,
  PortfolioSummary,
  ReturnTypeFetchAvailableAmountsToWithdrawForMarginAccount,
  ReturnTypeFetchMarginAccounts,
  ReturnTypeSimulateWithdrawMargin,
  simulateWithdrawMarginFromMarginAccountThunk,
} from './thunks';
import { fetchMarginAccountsForWithdrawThunk } from './thunks/fetchMarginAccountsForWithdrawThunk';
import { PositionSortId } from './types';

const slice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    resetPortfolioStateAction: () => initialState,
    openMarginAccountWithdrawFlowAction: (state) => {
      state.marginAccountWithdrawMarginFlow.step = 'opened';
    },
    closeMarginAccountWithdrawFlowAction: (state) => {
      state.marginAccountWithdrawMarginFlow.step = 'closed';
    },
    openCreateMarginAccountDialogAction: (state) => {
      state.createMarginAccountDialogState = 'opened';
    },
    closeCreateMarginAccountDialogAction: (state) => {
      state.createMarginAccountDialogState = 'closed';
    },
    selectMarginAccountWithdrawFlowAction: (
      state,
      {
        payload: { id },
      }: PayloadAction<{
        id: string;
      }>,
    ) => {
      const selectedMarginAccount = (
        state.marginAccountWithdrawMarginFlow.marginAccounts || []
      ).find((mA) => mA.id === id);
      if (selectedMarginAccount) {
        state.marginAccountWithdrawMarginFlow.selectedMarginAccount = selectedMarginAccount;
      }
    },
    marginAmountWithdrawFlowValueChangeAction: (
      state,
      {
        payload: { value, maxAmount, maxAmountUSD, token },
      }: PayloadAction<{
        value: number;
        maxAmount?: number;
        maxAmountUSD?: number;
        token: AvailableAmountForMarginAccount['token'];
      }>,
    ) => {
      state.marginAccountWithdrawMarginFlow.userInput.amount = value;
      if (maxAmount !== undefined) {
        state.marginAccountWithdrawMarginFlow.userInput.maxAmount = maxAmount;
      }
      if (maxAmountUSD !== undefined) {
        state.marginAccountWithdrawMarginFlow.userInput.maxAmountUSD = maxAmountUSD;
      }
      if (token) {
        state.marginAccountWithdrawMarginFlow.userInput.token = token;
      }
    },
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
      .addCase(fetchMarginAccountsThunk.rejected, (state, { meta }) => {
        state.marginAccountsLoadedState = 'failed';
        state.marginAccounts = [];
        state.page = meta.arg.page;
      })
      .addCase(fetchMarginAccountsThunk.fulfilled, (state, { meta, payload }) => {
        state.marginAccountsLoadedState = 'succeeded';
        const { marginAccounts, totalMarginAccounts } = payload as ReturnTypeFetchMarginAccounts;
        state.marginAccounts = marginAccounts;
        state.totalMarginAccounts = totalMarginAccounts;
        state.page = meta.arg.page;
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
      })
      .addCase(createMarginAccountThunk.pending, (state) => {
        state.createMarginAccountLoadedState = 'pending';
        state.createMarginAccountError = '';
      })
      .addCase(createMarginAccountThunk.rejected, (state, { payload }) => {
        state.createMarginAccountLoadedState = 'failed';
        state.createMarginAccountError = payload as string;
      })
      .addCase(createMarginAccountThunk.fulfilled, (state, { meta, payload }) => {
        state.createMarginAccountLoadedState = 'succeeded';
        state.createMarginAccountError = '';
        state.createMarginAccountDialogState = 'closed';
      })
      .addCase(fetchMarginAccountsForWithdrawThunk.pending, (state) => {
        state.marginAccountWithdrawMarginFlow.marginAccountsLoadedState = 'pending';
        state.marginAccountWithdrawMarginFlow.marginAccounts = [];
      })
      .addCase(fetchMarginAccountsForWithdrawThunk.rejected, (state) => {
        state.marginAccountWithdrawMarginFlow.marginAccountsLoadedState = 'failed';
        state.marginAccountWithdrawMarginFlow.marginAccounts = [];
      })
      .addCase(fetchMarginAccountsForWithdrawThunk.fulfilled, (state, { payload }) => {
        state.marginAccountWithdrawMarginFlow.marginAccountsLoadedState = 'succeeded';
        const { marginAccounts } = payload as ReturnTypeFetchMarginAccounts;
        state.marginAccountWithdrawMarginFlow.marginAccounts = marginAccounts;
      })
      .addCase(fetchAvailableAmountsToWithdrawForMarginAccountThunk.pending, (state) => {
        state.marginAccountWithdrawMarginFlow.availableAmountsLoadedState = 'pending';
        state.marginAccountWithdrawMarginFlow.availableAmounts = [];
      })
      .addCase(fetchAvailableAmountsToWithdrawForMarginAccountThunk.rejected, (state) => {
        state.marginAccountWithdrawMarginFlow.availableAmountsLoadedState = 'failed';
        state.marginAccountWithdrawMarginFlow.availableAmounts = [];
      })
      .addCase(
        fetchAvailableAmountsToWithdrawForMarginAccountThunk.fulfilled,
        (state, { payload }) => {
          const availableAmounts =
            payload as ReturnTypeFetchAvailableAmountsToWithdrawForMarginAccount;
          state.marginAccountWithdrawMarginFlow.availableAmountsLoadedState = 'succeeded';
          state.marginAccountWithdrawMarginFlow.availableAmounts = availableAmounts;
          if (availableAmounts.length > 0) {
            state.marginAccountWithdrawMarginFlow.userInput.token = availableAmounts[0].token;
            state.marginAccountWithdrawMarginFlow.userInput.maxAmount = availableAmounts[0].value;
            state.marginAccountWithdrawMarginFlow.userInput.maxAmountUSD =
              availableAmounts[0].valueUSD;
          }
        },
      )
      .addCase(simulateWithdrawMarginFromMarginAccountThunk.pending, (state) => {
        state.marginAccountWithdrawMarginFlow.simulation.status = 'pending';
        state.marginAccountWithdrawMarginFlow.simulation.value = null;
      })
      .addCase(simulateWithdrawMarginFromMarginAccountThunk.rejected, (state) => {
        state.marginAccountWithdrawMarginFlow.simulation.status = 'failed';
        state.marginAccountWithdrawMarginFlow.simulation.value = null;
      })
      .addCase(simulateWithdrawMarginFromMarginAccountThunk.fulfilled, (state, { payload }) => {
        state.marginAccountWithdrawMarginFlow.simulation.status = 'succeeded';
        state.marginAccountWithdrawMarginFlow.simulation.value =
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          payload as ReturnTypeSimulateWithdrawMargin;
      });
  },
});

export const {
  closeCreateMarginAccountDialogAction,
  openCreateMarginAccountDialogAction,
  resetPortfolioStateAction,
  togglePositionSortingDirectionAction,
  openMarginAccountWithdrawFlowAction,
  closeMarginAccountWithdrawFlowAction,
  selectMarginAccountWithdrawFlowAction,
  marginAmountWithdrawFlowValueChangeAction,
} = slice.actions;
export const portfolioReducer = slice.reducer;
