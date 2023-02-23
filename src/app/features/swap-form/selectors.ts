import { RootState } from '../../store';

export const selectSwapFormAMM = (state: RootState) => state.swapForm.amm;
export const selectFixedRateInfo = (state: RootState) => state.swapForm.fixedRate;
export const selectVariableRateInfo = (state: RootState) => state.swapForm.variableRate;

// ------------ Prospective Swap ------------
export const selectMode = (state: RootState) => state.swapForm.prospectiveSwap.mode;
export const selectNotionalAmount = (state: RootState) =>
  state.swapForm.prospectiveSwap.notionalAmount;

// ------------ Cashflow Calculator Selectors ------------
export const selectCashflowCalculatorStatus = (state: RootState) =>
  state.swapForm.cashflowCalculator.variableFactorStartNow.status;
export const selectCashflowCalculatorValidation = (state: RootState) =>
  state.swapForm.cashflowCalculator.valid;
export const selectPredictedApy = (state: RootState) =>
  state.swapForm.cashflowCalculator.predictedApy;
export const selectAdditionalCashflow = (state: RootState) =>
  state.swapForm.cashflowCalculator.additionalCashflow;
export const selectTotalCashflow = (state: RootState) =>
  state.swapForm.cashflowCalculator.totalCashflow;
