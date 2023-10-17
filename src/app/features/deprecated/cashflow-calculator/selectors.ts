import { RootState } from '../../../store';
import { formatUnderlyingTokenName } from '../../helpers';

export const selectCashflowAMM = (state: RootState) => state.deprecatedCashflowCalculator.aMM;

export const selectAMMTokenFormatted = (state: RootState) => {
  return formatUnderlyingTokenName(selectCashflowAMM(state));
};

export const selectCashflowInfoStatus = (state: RootState) =>
  state.deprecatedCashflowCalculator.cashflowInfo.status;

export const selectAdditionalCashflow = (state: RootState) => {
  if (state.deprecatedCashflowCalculator.cashflowInfo.status !== 'success') {
    return null;
  }

  return state.deprecatedCashflowCalculator.cashflowInfo.estimatedAdditionalCashflow(
    state.deprecatedCashflowCalculator.estimatedApy,
  );
};

export const selectTotalCashflow = (state: RootState) => {
  if (state.deprecatedCashflowCalculator.cashflowInfo.status !== 'success') {
    return null;
  }

  return state.deprecatedCashflowCalculator.cashflowInfo.estimatedTotalCashflow(
    state.deprecatedCashflowCalculator.estimatedApy,
  );
};

export const selectEstimatedApy = (state: RootState) =>
  state.deprecatedCashflowCalculator.estimatedApy;

export const selectVariableRateInfo = (state: RootState) =>
  state.deprecatedCashflowCalculator.aMM?.variableApy;
