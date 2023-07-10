import { RootState } from '../../store';
// TODO: FB, once we move wallet to redux we can improve this selector
export const selectAlphaPassVerificationFlowError =
  (account: string | null) => (state: RootState) =>
    state.alphaPassVerificationFlow.error[account || ''];
// TODO: FB, once we move wallet to redux we can improve this selector
export const selectAlphaPassVerificationFlowStatus =
  (account: string | null) => (state: RootState) =>
    state.alphaPassVerificationFlow.status[account || ''];
// TODO: FB, once we move wallet to redux we can improve this selector
export const selectAlphaPassVerificationFlowStep = (account: string | null) => (state: RootState) =>
  state.alphaPassVerificationFlow.step[account || ''];
