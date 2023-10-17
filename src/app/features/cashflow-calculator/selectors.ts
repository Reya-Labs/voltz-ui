import { RootState } from '../../store';
import { formatUnderlyingTokenName } from '../helpers';

export const selectCashflowPool = (state: RootState) => state.cashflowCalculator.pool;

export const selectPoolTokenFormatted = (state: RootState) => {
  return formatUnderlyingTokenName(selectCashflowPool(state));
};

export const selectCashflowInfoStatus = (state: RootState) =>
  state.cashflowCalculator.cashflowInfo.status;

export const selectTotalCashflow = (state: RootState) => {
  if (state.cashflowCalculator.cashflowInfo.status !== 'success') {
    return null;
  }

  return state.cashflowCalculator.cashflowInfo.totalCashflowUSD;
};

export const selectEstimatedVariableApy = (state: RootState) =>
  state.cashflowCalculator.estimatedVariableApy;
