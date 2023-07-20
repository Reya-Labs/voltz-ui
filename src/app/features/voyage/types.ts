import { Voyage } from '@voltz-protocol/v1-sdk';

export type SliceState = {
  status: Record<string, 'idle' | 'pending' | 'succeeded' | 'failed'>;
  badges: Record<string, Voyage[]>;
};

export type VoyageBadgeUI = {
  id: Voyage['id'];
  status: Voyage['status'];
  completed: boolean;
  isClaimable: boolean;
  achievedAt: number | undefined;
};
