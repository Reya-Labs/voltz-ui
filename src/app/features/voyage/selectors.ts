import { RootState } from '../../store';
import { selectChainId } from '../network';
import { getVoyageId } from './helpers';
import { VoyageBadgeUI } from './types';

// TODO: FB, once we move wallet to redux we can improve this selector
export const selectVoyageBadgesStatus = (account: string) => (state: RootState) => {
  if (!account) {
    return 'idle';
  }

  const chainId = selectChainId(state);
  if (!chainId) {
    return 'idle';
  }

  const status =
    state.voyage.status[
      getVoyageId({
        chainId,
        account,
      })
    ];

  if (!status) {
    return 'idle';
  }

  return status;
};

export const selectVoyageBadges =
  (account: string) =>
  (state: RootState): VoyageBadgeUI[] => {
    if (!account) {
      return [];
    }
    const chainId = selectChainId(state);
    if (!chainId) {
      return [];
    }
    const badges =
      state.voyage.badges[
        getVoyageId({
          chainId,
          account,
        })
      ];

    if (!badges) {
      return [];
    }
    return badges.map((badge) => ({
      id: badge.id,
      completed: Boolean(badge.timestamp),
      isClaimable: false,
      status: badge.status,
      achievedAt: badge.timestamp ? badge.timestamp : undefined,
    }));
  };
