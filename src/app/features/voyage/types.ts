import { Voyage } from '@voltz-protocol/v1-sdk';

export type VoyageBadgeUI = {
  id: Voyage['id'];
  status: Voyage['status'];
  completed: boolean;
  isClaimable: boolean;
  achievedAt: number | undefined;
};
