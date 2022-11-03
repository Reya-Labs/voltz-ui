import { Season } from '../../../hooks/season/types';
import { BadgeVariant, GetProfileBadgesResponse } from './types';
import { SEASON_BADGE_VARIANTS } from './mappers';

export function getDefaultResponse(seasonId: Season['id']): GetProfileBadgesResponse {
  return SEASON_BADGE_VARIANTS[seasonId].map((b) => ({
    variant: b as BadgeVariant,
  }));
}

/**
 * "Convert seconds to milliseconds, but only if the input is a number and not zero."
 *
 * @param {number} seconds - number - The number of seconds to convert to milliseconds.
 * @returns A function that takes a number and returns a number or undefined.
 */
export const toMillis = (seconds: number): number | undefined => {
  if (isNaN(seconds) || seconds === 0) {
    return undefined;
  }

  return seconds * 1000;
};

export const getSeasonUserId = (userId: string, seasonId: Season['id']) =>
  `${userId.toLowerCase()}#${seasonId}`;
