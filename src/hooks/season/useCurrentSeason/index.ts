import { SEASONS } from '../constants';
import { Season } from '../types';

export const useCurrentSeason = (now: number = Date.now().valueOf()): Season => {
  for (const season of SEASONS) {
    const seasonStartDate = season.startDate.toMillis();
    const seasonEndDate = season.endDate.toMillis();
    if (seasonStartDate <= now && now <= seasonEndDate) {
      return season;
    }
  }

  return SEASONS[0];
};
