import { Season } from '../../../../hooks/season/types';
import { BADGE_TYPE_BADGE_VARIANT_MAP, SEASON_BADGE_VARIANTS } from './mappers';
import { BadgeVariant, GetProfileBadgesResponse } from './types';
import { getDefaultResponse } from './helpers';
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
    const nonProgDbUrl = process.env.REACT_APP_DB_BADGES_URL;
    const referralsDbUrl = process.env.REACT_APP_REFERRAL_AND_SIGNATURE_SERVICE_URL;
    if (!subgraphUrl || !nonProgDbUrl) {
      return getDefaultResponse(seasonId);
    }

    const badges = await SBT.getSeasonBadges({
      subgraphUrl: subgraphUrl,
      nonProgDbUrl: nonProgDbUrl,
      referralsDbUrl: referralsDbUrl,
      userId: userId,
      seasonId: seasonId,
    });

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
        achievedAt: badge.awardedTimestampMs,
        claimedAt: badge.mintedTimestampMs,
      };
    });
  } catch (error) {
    return getDefaultResponse(seasonId);
  }
}
