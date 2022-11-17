import { gql, GraphQLClient } from 'graphql-request';
import { Season } from '../../../hooks/season/types';
import { BADGE_TYPE_BADGE_VARIANT_MAP, SEASON_BADGE_VARIANTS } from './mappers';
import {
  BadgesQueryResponse,
  BadgeVariant,
  GetProfileBadgesResponse,
} from './types';
import { getDefaultResponse, getSeasonUserId, toMillis } from './helpers';

const getBadgesQueryString = (owner: string, seasonId: Season['id']) => `
  {
    seasonUser(id: "${getSeasonUserId(owner, seasonId)}") {
      id
      badges {
        id
        awardedTimestamp
        mintedTimestamp
        badgeType
        badgeName
      }
    }
  }
`;

export async function getSeasonBadges({
  userId,
  seasonId,
}: {
  userId: string;
  seasonId: Season['id'];
}): Promise<GetProfileBadgesResponse> {
  if (!process.env.REACT_APP_SUBGRAPH_BADGES_URL) {
    return getDefaultResponse(seasonId);
  }
  try {
    const graphQLClient = new GraphQLClient(process.env.REACT_APP_SUBGRAPH_BADGES_URL);

    const data: BadgesQueryResponse = await graphQLClient.request(
      gql`
        ${getBadgesQueryString(userId, seasonId)}
      `,
    );

    if (!data.seasonUser) {
      return getDefaultResponse(seasonId);
    }

    const badges = data.seasonUser.badges;
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
