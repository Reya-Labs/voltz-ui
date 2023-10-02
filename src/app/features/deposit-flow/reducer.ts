import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContractReceipt } from 'ethers';

import { ReturnTypeFetchMarginAccounts } from '../portfolio';
import { initialState } from './state';
import {
  approveTokenForPeripheryThunk,
  AvailableAmountForMarginAccountDeposit,
  depositMarginFromMarginAccountThunk,
  fetchAvailableAmountsToDepositForMarginAccountThunk,
  fetchMarginAccountsForDepositThunk,
  getTokenAllowanceForPeripheryThunk,
  ReturnTypeSimulateDepositMargin,
  simulateDepositMarginFromMarginAccountThunk,
} from './thunks';

const slice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    openMarginAccountDepositFlowAction: (state) => {
      state.step = 'opened';
    },
    closeMarginAccountDepositFlowAction: (state) => {
      state.step = 'closed';
      state.userInput = {
        ...initialState.userInput,
      };
      state.walletTokenAllowance = {
        ...initialState.walletTokenAllowance,
      };
      state.selectedMarginAccount = null;
      state.error = null;
      state.simulation = {
        ...initialState.simulation,
      };
    },
    selectMarginAccountDepositFlowAction: (
      state,
      {
        payload: { id },
      }: PayloadAction<{
        id: string;
      }>,
    ) => {
      const selectedMarginAccount = (state.marginAccounts || []).find((mA) => mA.id === id);
      if (selectedMarginAccount) {
        state.selectedMarginAccount = selectedMarginAccount;
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
      state.userInput.amount = value;
      if (maxAmount !== undefined) {
        state.userInput.maxAmount = maxAmount;
      }
      if (maxAmountUSD !== undefined) {
        state.userInput.maxAmountUSD = maxAmountUSD;
      }
      if (token) {
        state.userInput.token = token;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarginAccountsForDepositThunk.pending, (state) => {
        state.marginAccountsLoadedState = 'pending';
        state.marginAccounts = [];
      })
      .addCase(fetchMarginAccountsForDepositThunk.rejected, (state) => {
        state.marginAccountsLoadedState = 'failed';
        state.marginAccounts = [];
      })
      .addCase(fetchMarginAccountsForDepositThunk.fulfilled, (state, { payload }) => {
        state.marginAccountsLoadedState = 'succeeded';
        const { marginAccounts } = payload as ReturnTypeFetchMarginAccounts;
        state.marginAccounts = marginAccounts;
      })
      .addCase(fetchAvailableAmountsToDepositForMarginAccountThunk.pending, (state) => {
        state.availableAmountsLoadedState = 'pending';
        state.availableAmounts = [];
      })
      .addCase(fetchAvailableAmountsToDepositForMarginAccountThunk.rejected, (state) => {
        state.availableAmountsLoadedState = 'failed';
        state.availableAmounts = [];
      })
      .addCase(
        fetchAvailableAmountsToDepositForMarginAccountThunk.fulfilled,
        (state, { payload }) => {
          const availableAmounts = payload as AvailableAmountForMarginAccountDeposit[];
          state.availableAmountsLoadedState = 'succeeded';
          state.availableAmounts = availableAmounts;
          if (availableAmounts.length > 0) {
            const firstAvailableAmount = availableAmounts[0];
            state.userInput.token = firstAvailableAmount.token;
            state.userInput.maxAmount = firstAvailableAmount.value;
            state.userInput.maxAmountUSD = firstAvailableAmount.valueUSD;
          }
        },
      )
      .addCase(simulateDepositMarginFromMarginAccountThunk.pending, (state) => {
        state.simulation.status = 'pending';
        state.simulation.value = null;
      })
      .addCase(simulateDepositMarginFromMarginAccountThunk.rejected, (state) => {
        state.simulation.status = 'failed';
        state.simulation.value = null;
      })
      .addCase(simulateDepositMarginFromMarginAccountThunk.fulfilled, (state, { payload }) => {
        state.simulation.status = 'succeeded';
        state.simulation.value =
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          payload as ReturnTypeSimulateDepositMargin;
      })
      .addCase(depositMarginFromMarginAccountThunk.pending, (state) => {
        state.step = 'depositing';
        state.error = null;
      })
      .addCase(depositMarginFromMarginAccountThunk.rejected, (state, { payload }) => {
        state.step = 'deposit-error';
        state.error = payload as string;
      })
      .addCase(depositMarginFromMarginAccountThunk.fulfilled, (state, { payload }) => {
        state.step = 'deposit-success';
        state.txHash = (payload as ContractReceipt).transactionHash;
        state.error = null;
      })
      .addCase(getTokenAllowanceForPeripheryThunk.pending, (state) => {
        state.walletTokenAllowance = {
          value: 0,
          status: 'pending',
        };
      })
      .addCase(getTokenAllowanceForPeripheryThunk.rejected, (state) => {
        state.walletTokenAllowance = {
          value: 0,
          status: 'failed',
        };
      })
      .addCase(getTokenAllowanceForPeripheryThunk.fulfilled, (state, { payload }) => {
        state.walletTokenAllowance = {
          value: payload as number,
          status: 'succeeded',
        };
      })
      .addCase(approveTokenForPeripheryThunk.pending, (state) => {
        state.step = 'approvingToken';
        state.error = null;
      })
      .addCase(approveTokenForPeripheryThunk.rejected, (state, { payload }) => {
        state.step = 'approveTokenError';
        state.error = payload as string;
      })
      .addCase(approveTokenForPeripheryThunk.fulfilled, (state, { payload }) => {
        state.step = 'opened';
        state.error = null;
        state.walletTokenAllowance.value = payload as number;
      });
  },
});

export const {
  openMarginAccountDepositFlowAction,
  closeMarginAccountDepositFlowAction,
  selectMarginAccountDepositFlowAction,
  marginAmountDepositFlowValueChangeAction,
} = slice.actions;
export const depositFlowReducer = slice.reducer;
