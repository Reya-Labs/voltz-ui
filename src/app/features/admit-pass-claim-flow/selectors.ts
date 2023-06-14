import { RootState } from '../../store';

export const selectAdmitPassClaimFlowError = (state: RootState) => state.adminPassClaimFlow.error;
export const selectAdmitPassClaimFlowStatus = (state: RootState) => state.adminPassClaimFlow.status;
export const selectAdmitPassClaimFlowStep = (state: RootState) => state.adminPassClaimFlow.step;
export const selectAdmitPassTotalPasses = (state: RootState) => {
  return state.adminPassClaimFlow.totalAdmitPass;
};
