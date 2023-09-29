import { RootState } from '../../store';
import { formatUnderlyingTokenName } from '../helpers';

export const selectCashflowPool = (state: RootState) => state.cashflowCalculatorModal.pool;

export const selectPoolTokenFormatted = (state: RootState) => {
  return formatUnderlyingTokenName(selectCashflowPool(state));
};

export const selectCashflowInfoStatus = (state: RootState) =>
  state.cashflowCalculatorModal.cashflowInfo.status;

export const selectAdditionalCashflow = (state: RootState) => {
  if (state.cashflowCalculatorModal.cashflowInfo.status !== 'success') {
    return null;
  }

  return state.cashflowCalculatorModal.cashflowInfo.additionalCashflowUSD;
};

export const selectTotalCashflow = (state: RootState) => {
  if (state.cashflowCalculatorModal.cashflowInfo.status !== 'success') {
    return null;
  }

  return state.cashflowCalculatorModal.cashflowInfo.totalCashflowUSD;
};

export const selectEstimatedVariableApy = (state: RootState) =>
  state.cashflowCalculatorModal.estimatedVariableApy;
