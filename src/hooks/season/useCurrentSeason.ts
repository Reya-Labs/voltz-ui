import { SEASONS } from './constants';
import { Season } from './types';

export const useCurrentSeason = (): Season => {
  const now = Date.now().valueOf();

  for (const season of SEASONS) {
    const seasonStartDate = season.startDate.toMillis();
    const seasonEndDate = season.endDate.toMillis();
    if (seasonStartDate <= now && now <= seasonEndDate) {
      return season;
    }
  }

  return SEASONS[0];
};
