import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { SEASONS } from '../constants';
import { Season } from '../types';

export const useCurrentSeason = (
  chainId: SupportedChainId | null,
  now: number = Date.now().valueOf(),
): Season => {
  if (!chainId) {
    return SEASONS[SupportedChainId.mainnet][0];
  }
  const seasons = SEASONS[chainId];
  for (const season of seasons) {
    const seasonStartDate = season.startDate.toMillis();
    const seasonEndDate = season.endDate.toMillis();
    if (seasonStartDate <= now && now <= seasonEndDate) {
      return season;
    }
  }

  return seasons[0];
};
