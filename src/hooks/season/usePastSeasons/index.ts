import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { SEASONS } from '../constants';
import { Season } from '../types';

export const usePastSeasons = (
  chainId: SupportedChainId | null,
  now: number = Date.now().valueOf(),
): Season[] => {
  if (!chainId) {
    return [];
  }
  const seasons = SEASONS[chainId];
  return seasons.filter((season) => season.endDate.toMillis() < now);
};
