import { RootState } from '../../store';
import { selectVoyageBadges } from '../voyage';

const ADMIT_PASS_VOYAGE_BADGES_MAP: Record<number, number> = {
  0: 0,
  1: 3,
  2: 5,
  3: 8,
  4: 12,
};

export const selectAdmitPassClaimFlowError = (state: RootState) => state.adminPassClaimFlow.error;
export const selectAdmitPassClaimFlowStatus = (state: RootState) => state.adminPassClaimFlow.status;
export const selectAdmitPassClaimFlowStep = (state: RootState) => state.adminPassClaimFlow.step;
export const selectAdmitPassTotalPasses = (account: string) => (state: RootState) => {
  const voyageBadgesAchieved = selectVoyageBadges(account)(state).filter(
    (b) => b.status === 'achieved',
  ).length;
  return ADMIT_PASS_VOYAGE_BADGES_MAP[voyageBadgesAchieved];
};
