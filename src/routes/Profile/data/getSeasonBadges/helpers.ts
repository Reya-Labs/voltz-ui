import { Season } from '../../../../hooks/season/types';
import { SEASON_BADGE_VARIANTS } from './mappers';
import { BadgeVariant, GetProfileBadgesResponse } from './types';

export function getDefaultResponse(seasonId: Season['id']): GetProfileBadgesResponse {
  return SEASON_BADGE_VARIANTS[seasonId].map((b) => ({
    variant: b as BadgeVariant,
  }));
}
