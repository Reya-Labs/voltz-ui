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
    const seasonStartDate = season.startDate;
    const seasonEndDate = season.endDate;
    if (seasonStartDate <= now && now <= seasonEndDate) {
      return season;
    }
  }
  const lastSeason = seasons[seasons.length - 1];
  if (now > lastSeason.endDate) {
    return seasons[seasons.length - 1];
  }
  return seasons[0];
};
