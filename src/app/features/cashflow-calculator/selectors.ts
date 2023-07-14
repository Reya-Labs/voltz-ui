import { RootState } from '../../store';
import { formatUnderlyingTokenName } from '../helpers';

export const selectCashflowAMM = (state: RootState) => state.cashflowCalculator.aMM;

export const selectAMMTokenFormatted = (state: RootState) => {
  return formatUnderlyingTokenName(selectCashflowAMM(state));
};

export const selectCashflowInfoStatus = (state: RootState) =>
  state.cashflowCalculator.cashflowInfo.status;

export const selectAdditionalCashflow = (state: RootState) => {
  if (state.cashflowCalculator.cashflowInfo.status !== 'success') {
    return null;
  }

  return state.cashflowCalculator.cashflowInfo.estimatedAdditionalCashflow(
    state.cashflowCalculator.estimatedApy,
  );
};

export const selectTotalCashflow = (state: RootState) => {
  if (state.cashflowCalculator.cashflowInfo.status !== 'success') {
    return null;
  }

  return state.cashflowCalculator.cashflowInfo.estimatedTotalCashflow(
    state.cashflowCalculator.estimatedApy,
  );
};

export const selectEstimatedApy = (state: RootState) => state.cashflowCalculator.estimatedApy;

export const selectVariableRateInfo = (state: RootState) =>
  state.cashflowCalculator.aMM?.variableApy;
