import { SEASONS } from '../constants';
import { Season } from '../types';

export const usePastSeasons = (now: number = Date.now().valueOf()): Season[] => {
  return SEASONS.filter((season) => season.endDate.toMillis() < now);
};
