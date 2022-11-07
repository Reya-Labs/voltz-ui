import { GetProfileBadgesResponse } from '@graphql';

let SEASON_BADGE_CACHE: Record<string, GetProfileBadgesResponse | undefined> = {};

export const setCacheValue = (id: string, value: GetProfileBadgesResponse) =>
  (SEASON_BADGE_CACHE[id] = value);

export const getCacheValue = (id: string) => SEASON_BADGE_CACHE[id];

export const invalidateCache = () => (SEASON_BADGE_CACHE = {});
