import { RootState } from '../../store';

export const selectCashflowAMM = (state: RootState) => state.cashflowCalculator.aMM;

export const selectCashflowAMMTokenFormatted = (state: RootState) => {
  const aMM = selectCashflowAMM(state);
  if (!aMM) {
    return '';
  }
  return ` ${aMM.underlyingToken.name.toUpperCase()}`;
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
