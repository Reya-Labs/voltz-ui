import { SEASONS } from './constants';
import { Season } from './types';

export const usePastSeasons = (): Season[] => {
  const now = Date.now().valueOf();
  return SEASONS.filter((season) => season.endDate.toMillis() < now);
};
