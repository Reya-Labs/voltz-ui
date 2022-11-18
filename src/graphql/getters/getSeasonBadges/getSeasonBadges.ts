import { Season } from '../../../hooks/season/types';
import { BADGE_TYPE_BADGE_VARIANT_MAP, SEASON_BADGE_VARIANTS } from './mappers';
import { BadgeResponse, BadgeVariant, GetProfileBadgesResponse } from './types';
import { getDefaultResponse, toMillis } from './helpers';
import { Signer } from 'ethers';
import { CommunitySBT } from '@voltz-protocol/v1-sdk';

export async function getSeasonBadges({
  userId,
  seasonId,
  signer,
}: {
  userId: string;
  seasonId: Season['id'];
  signer: Signer;
}): Promise<GetProfileBadgesResponse> {
  if (!process.env.REACT_APP_SUBGRAPH_BADGES_URL) {
    return getDefaultResponse(seasonId);
  }
  try {
    const SBT = new CommunitySBT({
      id: `${userId}#${seasonId}`,
      signer: signer,
    });

    const subgraphUrl = process.env.REACT_APP_SUBGRAPH_BADGES_URL;
    const dbUrl = process.env.REACT_APP_DB_BADGES_URL;
    if (!subgraphUrl || !dbUrl) {
      return getDefaultResponse(seasonId);
    }

    const badges = (await SBT.getSeasonBadges({
      subgraphUrl: subgraphUrl,
      dbUrl: dbUrl,
      userId: userId,
      seasonId: seasonId,
    })) as BadgeResponse[];

    return SEASON_BADGE_VARIANTS[seasonId].map((badgeVariant) => {
      const badge = badges.find((b) => BADGE_TYPE_BADGE_VARIANT_MAP[b.badgeType] === badgeVariant);
      if (!badge) {
        return {
          variant: badgeVariant as BadgeVariant,
        };
      }
      return {
        badgeResponseRaw: badge,
        variant: BADGE_TYPE_BADGE_VARIANT_MAP[badge.badgeType],
        achievedAt: toMillis(parseInt(badge.awardedTimestamp, 10)),
        claimedAt: toMillis(parseInt(badge.mintedTimestamp, 10)),
      };
    });
  } catch (error) {
    return getDefaultResponse(seasonId);
  }
}
