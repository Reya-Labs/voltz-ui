import { CommunitySBT } from '@voltz-protocol/v1-sdk';

import { Season } from '../../../../hooks/season/types';
import { getDefaultResponse } from './helpers';
import { BADGE_TYPE_BADGE_VARIANT_MAP, SEASON_BADGE_VARIANTS } from './mappers';
import { BadgeVariant, GetProfileBadgesResponse } from './types';

export async function getSeasonBadges({
  userId,
  season,
  sbt,
}: {
  userId: string;
  season: Season;
  sbt: CommunitySBT;
}): Promise<GetProfileBadgesResponse> {
  try {
    const badges = await sbt.getSeasonBadges({
      userId: userId,
      seasonId: season.id,
      seasonStart: season.startDate.toSeconds(),
      seasonEnd: season.endDate.toSeconds(),
    });

    return SEASON_BADGE_VARIANTS[season.id].map((badgeVariant) => {
      const badge = badges.find((b) => BADGE_TYPE_BADGE_VARIANT_MAP[b.badgeType] === badgeVariant);
      if (!badge) {
        return {
          variant: badgeVariant as BadgeVariant,
        };
      }
      return {
        badgeResponseRaw: badge,
        variant: BADGE_TYPE_BADGE_VARIANT_MAP[badge.badgeType],
        achievedAt: badge.awardedTimestampMs,
        claimedAt: badge.mintedTimestampMs,
      };
    });
  } catch (error) {
    return getDefaultResponse(season.id);
  }
}
