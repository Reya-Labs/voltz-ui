import { RootState } from '../../store';

export const selectAlphaPassClaimFlowError = (state: RootState) => state.alphaPassClaimFlow.error;
export const selectAlphaPassClaimFlowStatus = (state: RootState) => state.alphaPassClaimFlow.status;
export const selectAlphaPassClaimFlowStep = (state: RootState) => state.alphaPassClaimFlow.step;
export const selectAlphaPassTotalPasses = (state: RootState) => {
  return state.alphaPassClaimFlow.totalAlphaPass;
};
