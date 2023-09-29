import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContractReceipt } from 'ethers';

import { getNextSortDirection } from '../helpers';
import {
  initialPositionsSortingDirection,
  resetMarginAccountsSortingDirection,
  resetPositionsSortingDirection,
} from './constants';
import { initialState } from './state';
import {
  approveTokenForPeripheryThunk,
  AvailableAmountForMarginAccountWithdraw,
  createMarginAccountThunk,
  depositMarginFromMarginAccountThunk,
  fetchAvailableAmountsToDepositForMarginAccountThunk,
  fetchAvailableAmountsToWithdrawForMarginAccountThunk,
  fetchMarginAccountPositionsThunk,
  fetchMarginAccountsForDepositThunk,
  fetchMarginAccountsForSelectionThunk,
  fetchMarginAccountsForWithdrawThunk,
  fetchMarginAccountsThunk,
  fetchMarginAccountSummaryThunk,
  fetchPortfolioSummaryThunk,
  getTokenAllowanceForPeripheryThunk,
  initialisePortfolioPositionsThunk,
  MarginAccountSummary,
  PortfolioMarginAccount,
  PortfolioPosition,
  PortfolioSummary,
  ReturnTypeFetchMarginAccounts,
  ReturnTypeSimulateDepositMargin,
  ReturnTypeSimulateWithdrawMargin,
  simulateDepositMarginFromMarginAccountThunk,
  simulateWithdrawMarginFromMarginAccountThunk,
  withdrawMarginFromMarginAccountThunk,
} from './thunks';
import { AvailableAmountForMarginAccountDeposit } from './thunks/fetchAvailableAmountsToDepositForMarginAccountThunk';
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
    openMarginAccountDepositFlowAction: (state) => {
      state.marginAccountDepositMarginFlow.step = 'opened';
    },
    closeMarginAccountDepositFlowAction: (state) => {
      state.marginAccountDepositMarginFlow.step = 'closed';
      state.marginAccountDepositMarginFlow.userInput = {
        ...initialState.marginAccountDepositMarginFlow.userInput,
      };
      state.marginAccountDepositMarginFlow.walletTokenAllowance = {
        ...initialState.marginAccountDepositMarginFlow.walletTokenAllowance,
      };
      state.marginAccountDepositMarginFlow.selectedMarginAccount = null;
      state.marginAccountDepositMarginFlow.error = null;
      state.marginAccountDepositMarginFlow.simulation = {
        ...initialState.marginAccountDepositMarginFlow.simulation,
      };
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
        token: AvailableAmountForMarginAccountWithdraw['token'];
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
    selectMarginAccountDepositFlowAction: (
      state,
      {
        payload: { id },
      }: PayloadAction<{
        id: string;
      }>,
    ) => {
      const selectedMarginAccount = (
        state.marginAccountDepositMarginFlow.marginAccounts || []
      ).find((mA) => mA.id === id);
      if (selectedMarginAccount) {
        state.marginAccountDepositMarginFlow.selectedMarginAccount = selectedMarginAccount;
      }
    },
    marginAmountDepositFlowValueChangeAction: (
      state,
      {
        payload: { value, maxAmount, maxAmountUSD, token },
      }: PayloadAction<{
        value: number;
        maxAmount?: number;
        maxAmountUSD?: number;
        token: AvailableAmountForMarginAccountDeposit['token'];
      }>,
    ) => {
      state.marginAccountDepositMarginFlow.userInput.amount = value;
      if (maxAmount !== undefined) {
        state.marginAccountDepositMarginFlow.userInput.maxAmount = maxAmount;
      }
      if (maxAmountUSD !== undefined) {
        state.marginAccountDepositMarginFlow.userInput.maxAmountUSD = maxAmountUSD;
      }
      if (token) {
        state.marginAccountDepositMarginFlow.userInput.token = token;
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
    toggleMarginAccountPositionsSortingDirectionAction: (
      state,
      {
        payload: { marginAccountId, sortId },
      }: PayloadAction<{
        sortId: PositionSortId;
        marginAccountId?: PortfolioMarginAccount['id'];
      }>,
    ) => {
      if (!marginAccountId) {
        return;
      }
      const direction = state.marginAccountPositionsSortingDirection[marginAccountId] || {
        ...initialPositionsSortingDirection,
      };
      state.marginAccountPositionsSortingDirection[marginAccountId] = {
        ...resetPositionsSortingDirection,
        [sortId]: getNextSortDirection(direction[sortId]),
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
      .addCase(fetchMarginAccountSummaryThunk.pending, (state, { meta }) => {
        state.marginAccountsSummary[meta.arg.marginAccountId] = {
          status: 'pending',
          value: null,
        };
      })
      .addCase(fetchMarginAccountSummaryThunk.rejected, (state, { meta }) => {
        state.marginAccountsSummary[meta.arg.marginAccountId] = {
          status: 'failed',
          value: null,
        };
      })
      .addCase(fetchMarginAccountSummaryThunk.fulfilled, (state, { payload, meta }) => {
        state.marginAccountsSummary[meta.arg.marginAccountId] = {
          status: 'succeeded',
          value: payload as MarginAccountSummary,
        };
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
          const availableAmounts = payload as AvailableAmountForMarginAccountWithdraw[];
          state.marginAccountWithdrawMarginFlow.availableAmountsLoadedState = 'succeeded';
          state.marginAccountWithdrawMarginFlow.availableAmounts = availableAmounts;
          if (availableAmounts.length > 0) {
            const firstAvailableAmount = availableAmounts[0];
            state.marginAccountWithdrawMarginFlow.userInput.token = firstAvailableAmount.token;
            state.marginAccountWithdrawMarginFlow.userInput.maxAmount = firstAvailableAmount.value;
            state.marginAccountWithdrawMarginFlow.userInput.maxAmountUSD =
              firstAvailableAmount.valueUSD;
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
      })
      .addCase(withdrawMarginFromMarginAccountThunk.pending, (state) => {
        state.marginAccountWithdrawMarginFlow.step = 'withdrawing';
        state.marginAccountWithdrawMarginFlow.error = null;
      })
      .addCase(withdrawMarginFromMarginAccountThunk.rejected, (state, { payload }) => {
        state.marginAccountWithdrawMarginFlow.step = 'withdraw-error';
        state.marginAccountWithdrawMarginFlow.error = payload as string;
      })
      .addCase(withdrawMarginFromMarginAccountThunk.fulfilled, (state, { payload }) => {
        state.marginAccountWithdrawMarginFlow.step = 'withdraw-success';
        state.marginAccountWithdrawMarginFlow.txHash = (payload as ContractReceipt).transactionHash;
        state.marginAccountWithdrawMarginFlow.error = null;
      })
      .addCase(fetchMarginAccountsForDepositThunk.pending, (state) => {
        state.marginAccountDepositMarginFlow.marginAccountsLoadedState = 'pending';
        state.marginAccountDepositMarginFlow.marginAccounts = [];
      })
      .addCase(fetchMarginAccountsForDepositThunk.rejected, (state) => {
        state.marginAccountDepositMarginFlow.marginAccountsLoadedState = 'failed';
        state.marginAccountDepositMarginFlow.marginAccounts = [];
      })
      .addCase(fetchMarginAccountsForDepositThunk.fulfilled, (state, { payload }) => {
        state.marginAccountDepositMarginFlow.marginAccountsLoadedState = 'succeeded';
        const { marginAccounts } = payload as ReturnTypeFetchMarginAccounts;
        state.marginAccountDepositMarginFlow.marginAccounts = marginAccounts;
      })
      .addCase(fetchMarginAccountsForSelectionThunk.pending, (state) => {
        state.marginAccountsForSelectionLoadedState = 'pending';
        state.marginAccountsForSelection = [];
      })
      .addCase(fetchMarginAccountsForSelectionThunk.rejected, (state) => {
        state.marginAccountsForSelectionLoadedState = 'failed';
        state.marginAccountsForSelection = [];
      })
      .addCase(fetchMarginAccountsForSelectionThunk.fulfilled, (state, { payload }) => {
        const { marginAccounts } = payload as ReturnTypeFetchMarginAccounts;
        state.marginAccountsForSelectionLoadedState = 'succeeded';
        state.marginAccountsForSelection = marginAccounts;
      })
      .addCase(fetchAvailableAmountsToDepositForMarginAccountThunk.pending, (state) => {
        state.marginAccountDepositMarginFlow.availableAmountsLoadedState = 'pending';
        state.marginAccountDepositMarginFlow.availableAmounts = [];
      })
      .addCase(fetchAvailableAmountsToDepositForMarginAccountThunk.rejected, (state) => {
        state.marginAccountDepositMarginFlow.availableAmountsLoadedState = 'failed';
        state.marginAccountDepositMarginFlow.availableAmounts = [];
      })
      .addCase(
        fetchAvailableAmountsToDepositForMarginAccountThunk.fulfilled,
        (state, { payload }) => {
          const availableAmounts = payload as AvailableAmountForMarginAccountDeposit[];
          state.marginAccountDepositMarginFlow.availableAmountsLoadedState = 'succeeded';
          state.marginAccountDepositMarginFlow.availableAmounts = availableAmounts;
          if (availableAmounts.length > 0) {
            const firstAvailableAmount = availableAmounts[0];
            state.marginAccountDepositMarginFlow.userInput.token = firstAvailableAmount.token;
            state.marginAccountDepositMarginFlow.userInput.maxAmount = firstAvailableAmount.value;
            state.marginAccountDepositMarginFlow.userInput.maxAmountUSD =
              firstAvailableAmount.valueUSD;
          }
        },
      )
      .addCase(simulateDepositMarginFromMarginAccountThunk.pending, (state) => {
        state.marginAccountDepositMarginFlow.simulation.status = 'pending';
        state.marginAccountDepositMarginFlow.simulation.value = null;
      })
      .addCase(simulateDepositMarginFromMarginAccountThunk.rejected, (state) => {
        state.marginAccountDepositMarginFlow.simulation.status = 'failed';
        state.marginAccountDepositMarginFlow.simulation.value = null;
      })
      .addCase(simulateDepositMarginFromMarginAccountThunk.fulfilled, (state, { payload }) => {
        state.marginAccountDepositMarginFlow.simulation.status = 'succeeded';
        state.marginAccountDepositMarginFlow.simulation.value =
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          payload as ReturnTypeSimulateDepositMargin;
      })
      .addCase(depositMarginFromMarginAccountThunk.pending, (state) => {
        state.marginAccountDepositMarginFlow.step = 'depositing';
        state.marginAccountDepositMarginFlow.error = null;
      })
      .addCase(depositMarginFromMarginAccountThunk.rejected, (state, { payload }) => {
        state.marginAccountDepositMarginFlow.step = 'deposit-error';
        state.marginAccountDepositMarginFlow.error = payload as string;
      })
      .addCase(depositMarginFromMarginAccountThunk.fulfilled, (state, { payload }) => {
        state.marginAccountDepositMarginFlow.step = 'deposit-success';
        state.marginAccountDepositMarginFlow.txHash = (payload as ContractReceipt).transactionHash;
        state.marginAccountDepositMarginFlow.error = null;
      })
      .addCase(getTokenAllowanceForPeripheryThunk.pending, (state) => {
        state.marginAccountDepositMarginFlow.walletTokenAllowance = {
          value: 0,
          status: 'pending',
        };
      })
      .addCase(getTokenAllowanceForPeripheryThunk.rejected, (state) => {
        state.marginAccountDepositMarginFlow.walletTokenAllowance = {
          value: 0,
          status: 'failed',
        };
      })
      .addCase(getTokenAllowanceForPeripheryThunk.fulfilled, (state, { payload }) => {
        state.marginAccountDepositMarginFlow.walletTokenAllowance = {
          value: payload as number,
          status: 'succeeded',
        };
      })
      .addCase(approveTokenForPeripheryThunk.pending, (state) => {
        state.marginAccountDepositMarginFlow.step = 'approvingToken';
        state.marginAccountDepositMarginFlow.error = null;
      })
      .addCase(approveTokenForPeripheryThunk.rejected, (state, { payload }) => {
        state.marginAccountDepositMarginFlow.step = 'approveTokenError';
        state.marginAccountDepositMarginFlow.error = payload as string;
      })
      .addCase(approveTokenForPeripheryThunk.fulfilled, (state, { payload }) => {
        state.marginAccountDepositMarginFlow.step = 'opened';
        state.marginAccountDepositMarginFlow.error = null;
        state.marginAccountDepositMarginFlow.walletTokenAllowance.value = payload as number;
      });
  },
});

export const {
  closeCreateMarginAccountDialogAction,
  openCreateMarginAccountDialogAction,
  resetPortfolioStateAction,
  togglePositionSortingDirectionAction,
  toggleMarginAccountPositionsSortingDirectionAction,
  openMarginAccountWithdrawFlowAction,
  closeMarginAccountWithdrawFlowAction,
  selectMarginAccountWithdrawFlowAction,
  marginAmountWithdrawFlowValueChangeAction,
  openMarginAccountDepositFlowAction,
  closeMarginAccountDepositFlowAction,
  selectMarginAccountDepositFlowAction,
  marginAmountDepositFlowValueChangeAction,
} = slice.actions;
export const portfolioReducer = slice.reducer;
