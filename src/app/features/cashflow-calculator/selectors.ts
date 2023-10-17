import { RootState } from '../../store';
import { formFormatNumber } from '../forms/common';

export const selectCashflowPool = (state: RootState) => state.cashflowCalculator.pool;
export const selectCashflowCalculatorDisabled = (state: RootState) => {
  const pool = selectCashflowPool(state);
  if (!pool) {
    return true;
  }

  const status = selectCashflowInfoStatus(state);
  return status === 'idle' || status === 'pending';
};
export const selectCashflowCalculatorError = (state: RootState) => {
  return state.cashflowCalculator.cashflowInfo.status === 'error'
    ? 'Failed to calculate :/ . Try editing the value!'
    : '';
};
export const selectCashflowInfoStatus = (state: RootState) =>
  state.cashflowCalculator.cashflowInfo.status;

export const selectTotalCashflow = (state: RootState) => {
  if (state.cashflowCalculator.cashflowInfo.status !== 'success') {
    return null;
  }

  return state.cashflowCalculator.cashflowInfo.totalCashflow;
};

export const selectTotalCashflowFormatted = (state: RootState) => {
  const totalCashflow = selectTotalCashflow(state);
  const token = state.cashflowCalculator.token;
  if (totalCashflow === null) {
    return '--';
  }

  let totalCashflowFormatted = formFormatNumber(Math.abs(totalCashflow));

  if (token === '$') {
    totalCashflowFormatted = `${token}${totalCashflowFormatted}`;
    return `${totalCashflow === 0 ? '' : totalCashflow > 0 ? '+' : '-'}${totalCashflowFormatted}`;
  }
  return `${totalCashflowFormatted} ${token.toUpperCase()}`;
};

export const selectEstimatedVariableApy = (state: RootState) =>
  state.cashflowCalculator.estimatedVariableApy;
