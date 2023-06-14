import { RootState } from '../../store';

export const selectAdmitPassVerificationFlowError = (state: RootState) =>
  state.admitPassVerificationFlow.error;
export const selectAdmitPassVerificationFlowStatus = (state: RootState) =>
  state.admitPassVerificationFlow.status;
export const selectAdmitPassVerificationFlowStep = (state: RootState) =>
  state.admitPassVerificationFlow.step;
