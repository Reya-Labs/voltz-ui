import { Voyage } from '@voltz-protocol/v1-sdk';

export type VoyageBadgeUI = {
  id: Voyage['id'];
  // todo: take it from Voyage['status']
  status: 'achieved' | 'notAchieved' | 'notStarted' | 'inProgress';
  completed: boolean;
  isClaimable: boolean;
  achievedAt: number | undefined;
};
