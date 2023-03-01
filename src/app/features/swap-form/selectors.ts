import { RootState } from '../../store';

export const selectSwapFormAMM = (state: RootState) => state.swapForm.amm;
export const selectSwapFormPosition = (state: RootState) => state.swapForm.position.value;
export const selectSwapFormPositionFetchingStatus = (state: RootState) =>
  state.swapForm.position.status;
export const selectWalletBalanceInfo = (state: RootState) => state.swapForm.walletBalance;
export const selectFixedRateInfo = (state: RootState) => state.swapForm.fixedRate;
export const selectVariableRateInfo = (state: RootState) => state.swapForm.variableRate;
export const selectAvailableNotionals = (state: RootState) => state.swapForm.availableNotionals;

// ------------ Prospective Swap ------------
export const selectMode = (state: RootState) => state.swapForm.prospectiveSwap.mode;
export const selectNotionalAmount = (state: RootState) =>
  state.swapForm.prospectiveSwap.notionalAmount;
export const selectMarginAmount = (state: RootState) => state.swapForm.prospectiveSwap.marginAmount;
export const selectInfoPostSwap = (state: RootState) => state.swapForm.prospectiveSwap.infoPostSwap;

// ------------ Cashflow Calculator Selectors ------------
export const selectCashflowCalculatorStatus = (state: RootState) =>
  state.swapForm.cashflowCalculator.variableFactorStartNow.status;
export const selectPredictedApy = (state: RootState) =>
  state.swapForm.cashflowCalculator.predictedApy;
export const selectAdditionalCashflow = (state: RootState) =>
  state.swapForm.cashflowCalculator.additionalCashflow;
export const selectTotalCashflow = (state: RootState) =>
  state.swapForm.cashflowCalculator.totalCashflow;

// ------------ Swap Confirmation Flow Selectors ------------
export const selectSwapConfirmationFlowStep = (state: RootState) =>
  state.swapForm.swapConfirmationFlow.step;
export const selectSwapConfirmationFlowError = (state: RootState) =>
  state.swapForm.swapConfirmationFlow.error;
