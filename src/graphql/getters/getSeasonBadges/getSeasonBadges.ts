import { GraphQLClient, gql } from 'graphql-request';
import { Season } from '../../../hooks/season/types';
import { BADGE_TYPE_BADGE_VARIANT_MAP, SEASON_BADGE_VARIANTS } from './helpers';

export type BadgeVariant =
  // season 1
  | 'degenStuff'
  | 'deltaDegen'
  | 'irsConnoisseur'
  | 'leverageCrowbar'
  | 'fixedTrader'
  | 'sushiRoll'
  | 'topTrader'
  | 'beWaterMyFriend'
  | 'rainMaker'
  | 'waterHose'
  | 'moneyMoneyMoney'
  | 'lpoor'
  | 'yikes'
  | 'maxBidding'
  | 'okBoomer'
  | 'dryIce'
  // season OG
  | 'ogDegenStuff'
  | 'ogDeltaDegen'
  | 'ogIrsConnoisseur'
  | 'ogLeverageCrowbar'
  | 'ogFixedTrader'
  | 'ogSushiRoll'
  | 'ogTopTrader'
  | 'ogBeWaterMyFriend'
  | 'ogRainMaker'
  | 'ogWaterHose'
  | 'ogMoneyMoneyMoney'
  | 'ogLpoor'
  | 'ogYikes'
  | 'ogMaxBidding'
  | 'ogOkBoomer'
  | 'ogDryIce';

export type CollectionBadge = {
  variant: BadgeVariant;
  achievedAt?: number;
  claimedAt?: number;
};

const getBadgesQueryString = (owner: string, seasonNumber: number) => {
  const id = `${owner.toLowerCase()}#${seasonNumber}`;
  return `{
    seasonUser(id: "${id}") {
      id
      badges {
        id
        awardedTimestamp
        mintedTimestamp
        badgeType
        badgeName
      }
    }
  }`;
};

const toMillis = (secondsTimestamp: number): number | undefined => {
  if (secondsTimestamp === 0) {
    return undefined;
  }

  return secondsTimestamp * 1000;
};

type BadgeResponse = {
  id: string;
  badgeType: string;
  badgeName: string;
  awardedTimestamp: string;
  mintedTimestamp: string;
};

type BadgesQueryResponse = {
  seasonUser: {
    id: string;
    badges: BadgeResponse[];
  };
};

export type GetProfileBadgesResponse = CollectionBadge[];

function getDefaultResponse(seasonId: Season['id']): GetProfileBadgesResponse {
  return SEASON_BADGE_VARIANTS[seasonId].map((b) => ({
    variant: b as BadgeVariant,
  }));
}

export async function getSeasonBadges(
  owner: string,
  seasonId: Season['id'],
): Promise<GetProfileBadgesResponse> {
  if (!process.env.REACT_APP_SUBGRAPH_BADGES_URL) {
    return getDefaultResponse(seasonId);
  }
  try {
    const graphQLClient = new GraphQLClient(process.env.REACT_APP_SUBGRAPH_BADGES_URL);

    const data: BadgesQueryResponse = await graphQLClient.request(
      gql`
        ${getBadgesQueryString(owner, seasonId)}
      `,
    );

    if (data.seasonUser) {
      const badges = data.seasonUser.badges;
      return SEASON_BADGE_VARIANTS[seasonId].map((badgeVariant) => {
        const badge = badges.find(
          (b) => BADGE_TYPE_BADGE_VARIANT_MAP[b.badgeType] === badgeVariant,
        );
        if (!badge) {
          return {
            variant: badgeVariant as BadgeVariant,
          };
        }
        return {
          variant: BADGE_TYPE_BADGE_VARIANT_MAP[badge.badgeType],
          achievedAt: toMillis(parseInt(badge.awardedTimestamp)),
          claimedAt: toMillis(parseInt(badge.mintedTimestamp)),
        };
      });
    } else {
      return getDefaultResponse(seasonId);
    }
  } catch (error) {
    return getDefaultResponse(seasonId);
  }
}
