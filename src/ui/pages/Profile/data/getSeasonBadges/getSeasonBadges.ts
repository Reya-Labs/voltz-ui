import { CommunitySBT, SupportedChainId } from '@voltz-protocol/v1-sdk';

import { Season } from '../../../../../hooks/season/types';
import { getDefaultResponse } from './helpers';
import { BADGE_TYPE_BADGE_VARIANT_MAP, CHAIN_SEASON_BADGE_VARIANTS } from './mappers';
import { BadgeVariant, GetProfileBadgesResponse } from './types';

export async function getSeasonBadges({
  userId,
  season,
  sbt,
  chainId = SupportedChainId.mainnet,
}: {
  chainId: SupportedChainId | null;
  userId: string;
  season: Season;
  sbt: CommunitySBT;
}): Promise<GetProfileBadgesResponse> {
  if (!chainId) {
    return getDefaultResponse(chainId!, season.id);
  }

  try {
    const badges = await sbt.getSeasonBadges({
      userId: userId,
      seasonId: season.id,
      seasonStart: season.startDate.toSeconds(),
      seasonEnd: season.endDate.toSeconds(),
    });

    return CHAIN_SEASON_BADGE_VARIANTS[chainId][season.id].map((badgeVariant) => {
      const badge = badges.find(
        (b) => BADGE_TYPE_BADGE_VARIANT_MAP[chainId][b.badgeType] === badgeVariant,
      );
      if (!badge) {
        return {
          variant: badgeVariant as BadgeVariant,
        };
      }
      return {
        badgeResponseRaw: badge,
        variant: BADGE_TYPE_BADGE_VARIANT_MAP[chainId][badge.badgeType],
        achievedAt: badge.awardedTimestampMs,
        claimedAt: badge.mintedTimestampMs,
      };
    });
  } catch (error) {
    return getDefaultResponse(chainId, season.id);
  }
}
