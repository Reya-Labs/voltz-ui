import { RootState } from '../../store';
// TODO: FB, once we move wallet to redux we can improve this selector
export const selectAlphaPassVerificationFlowStep = (account: string | null) => (state: RootState) =>
  state.alphaPassVerificationFlow.step[account || ''] || 'idle';
