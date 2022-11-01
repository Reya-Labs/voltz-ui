import { GraphQLClient, gql } from 'graphql-request';
import { Season } from '../../hooks/season/types';

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
      BADGE_NO_RISK_HERE_SER {
        awardedTimestamp
        mintedTimestamp
      }
      BADGE_DELTA_DEGEN {
        awardedTimestamp
        mintedTimestamp
      }
      BADGE_LEVERAGE_CROWBAR {
        awardedTimestamp
        mintedTimestamp
      }
      BADGE_IRS_CONNOISSEUR {
        awardedTimestamp
        mintedTimestamp
      }
      BADGE_SUSHI_ROLL {
        awardedTimestamp
        mintedTimestamp
      }
      BADGE_DEGEN_STUFF {
        awardedTimestamp
        mintedTimestamp
      }
      BADGE_OK_BOOMER {
        awardedTimestamp
        mintedTimestamp
      }
      BADGE_LPOOR {
        awardedTimestamp
        mintedTimestamp
      }
      BADGE_MONEY_MONEY_MONEY {
        awardedTimestamp
        mintedTimestamp
      }
      BADGE_WATER_HOSE {
        awardedTimestamp
        mintedTimestamp
      }
      BADGE_RAIN_MAKER {
        awardedTimestamp
        mintedTimestamp
      }
      BADGE_DRY_ICE {
        awardedTimestamp
        mintedTimestamp
      }
    }
  }`;
};

const formatTimestamp = (timestamp: number): number | undefined => {
  if (timestamp === 0) {
    return undefined;
  }

  return timestamp * 1000;
};

type BadgeResponse = {
  awardedTimestamp: string;
  mintedTimestamp: string;
};

type BadgesQueryResponse = {
  seasonUser: {
    BADGE_NO_RISK_HERE_SER: BadgeResponse;
    BADGE_DELTA_DEGEN: BadgeResponse;
    BADGE_LEVERAGE_CROWBAR: BadgeResponse;
    BADGE_IRS_CONNOISSEUR: BadgeResponse;
    BADGE_SUSHI_ROLL: BadgeResponse;
    BADGE_DEGEN_STUFF: BadgeResponse;
    BADGE_OK_BOOMER: BadgeResponse;
    BADGE_LPOOR: BadgeResponse;
    BADGE_MONEY_MONEY_MONEY: BadgeResponse;
    BADGE_WATER_HOSE: BadgeResponse;
    BADGE_RAIN_MAKER: BadgeResponse;
    BADGE_DRY_ICE: BadgeResponse;
  };
};

export type GetProfileBadgesResponse = CollectionBadge[];

function getDefaultResponse(seasonId: Season['id']): GetProfileBadgesResponse {
  return [
    {
      variant: mapForSeason(seasonId, 'fixedTrader'),
    },
    {
      variant: mapForSeason(seasonId, 'deltaDegen'),
    },
    {
      variant: mapForSeason(seasonId, 'leverageCrowbar'),
    },
    {
      variant: mapForSeason(seasonId, 'irsConnoisseur'),
    },
    {
      variant: mapForSeason(seasonId, 'sushiRoll'),
    },
    {
      variant: mapForSeason(seasonId, 'degenStuff'),
    },
    {
      variant: mapForSeason(seasonId, 'topTrader'),
    },
    {
      variant: mapForSeason(seasonId, 'okBoomer'),
    },
    {
      variant: mapForSeason(seasonId, 'maxBidding'),
    },
    {
      variant: mapForSeason(seasonId, 'yikes'),
    },
    {
      variant: mapForSeason(seasonId, 'lpoor'),
    },
    {
      variant: mapForSeason(seasonId, 'moneyMoneyMoney'),
    },
    {
      variant: mapForSeason(seasonId, 'waterHose'),
    },
    {
      variant: mapForSeason(seasonId, 'rainMaker'),
    },
    {
      variant: mapForSeason(seasonId, 'beWaterMyFriend'),
    },
    {
      variant: mapForSeason(seasonId, 'dryIce'),
    },
  ];
}

const mapForSeason = (seasonId: Season['id'], badgeVariant: string): BadgeVariant => {
  if (seasonId === 0) {
    return `og${badgeVariant[0].toUpperCase()}${badgeVariant.substring(1)}` as BadgeVariant;
  }
  return badgeVariant as BadgeVariant;
};

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
      const badges = data.seasonUser;

      return [
        {
          variant: mapForSeason(seasonId, 'fixedTrader'),
          achievedAt: formatTimestamp(parseInt(badges.BADGE_NO_RISK_HERE_SER.awardedTimestamp)),
          claimedAt: formatTimestamp(parseInt(badges.BADGE_NO_RISK_HERE_SER.mintedTimestamp)),
        },
        {
          variant: mapForSeason(seasonId, 'deltaDegen'),
          achievedAt: formatTimestamp(parseInt(badges.BADGE_DELTA_DEGEN.awardedTimestamp)),
          claimedAt: formatTimestamp(parseInt(badges.BADGE_DELTA_DEGEN.mintedTimestamp)),
        },
        {
          variant: mapForSeason(seasonId, 'leverageCrowbar'),
          achievedAt: formatTimestamp(parseInt(badges.BADGE_LEVERAGE_CROWBAR.awardedTimestamp)),
          claimedAt: formatTimestamp(parseInt(badges.BADGE_LEVERAGE_CROWBAR.mintedTimestamp)),
        },
        {
          variant: mapForSeason(seasonId, 'irsConnoisseur'),
          achievedAt: formatTimestamp(parseInt(badges.BADGE_IRS_CONNOISSEUR.awardedTimestamp)),
          claimedAt: formatTimestamp(parseInt(badges.BADGE_IRS_CONNOISSEUR.mintedTimestamp)),
        },
        {
          variant: mapForSeason(seasonId, 'sushiRoll'),
          achievedAt: formatTimestamp(parseInt(badges.BADGE_SUSHI_ROLL.awardedTimestamp)),
          claimedAt: formatTimestamp(parseInt(badges.BADGE_SUSHI_ROLL.mintedTimestamp)),
        },
        {
          variant: mapForSeason(seasonId, 'degenStuff'),
          achievedAt: formatTimestamp(parseInt(badges.BADGE_DEGEN_STUFF.awardedTimestamp)),
          claimedAt: formatTimestamp(parseInt(badges.BADGE_DEGEN_STUFF.mintedTimestamp)),
        },
        {
          variant: mapForSeason(seasonId, 'topTrader'),
        },
        {
          variant: mapForSeason(seasonId, 'okBoomer'),
          achievedAt: formatTimestamp(parseInt(badges.BADGE_OK_BOOMER.awardedTimestamp)),
          claimedAt: formatTimestamp(parseInt(badges.BADGE_OK_BOOMER.mintedTimestamp)),
        },
        {
          variant: mapForSeason(seasonId, 'maxBidding'),
        },
        {
          variant: mapForSeason(seasonId, 'yikes'),
        },
        {
          variant: mapForSeason(seasonId, 'lpoor'),
          achievedAt: formatTimestamp(parseInt(badges.BADGE_LPOOR.awardedTimestamp)),
          claimedAt: formatTimestamp(parseInt(badges.BADGE_LPOOR.mintedTimestamp)),
        },
        {
          variant: mapForSeason(seasonId, 'moneyMoneyMoney'),
          achievedAt: formatTimestamp(parseInt(badges.BADGE_MONEY_MONEY_MONEY.awardedTimestamp)),
          claimedAt: formatTimestamp(parseInt(badges.BADGE_MONEY_MONEY_MONEY.mintedTimestamp)),
        },
        {
          variant: mapForSeason(seasonId, 'waterHose'),
          achievedAt: formatTimestamp(parseInt(badges.BADGE_WATER_HOSE.awardedTimestamp)),
          claimedAt: formatTimestamp(parseInt(badges.BADGE_WATER_HOSE.mintedTimestamp)),
        },
        {
          variant: mapForSeason(seasonId, 'rainMaker'),
          achievedAt: formatTimestamp(parseInt(badges.BADGE_RAIN_MAKER.awardedTimestamp)),
          claimedAt: formatTimestamp(parseInt(badges.BADGE_RAIN_MAKER.mintedTimestamp)),
        },
        {
          variant: mapForSeason(seasonId, 'beWaterMyFriend'),
        },
        {
          variant: mapForSeason(seasonId, 'dryIce'),
          achievedAt: formatTimestamp(parseInt(badges.BADGE_DRY_ICE.awardedTimestamp)),
          claimedAt: formatTimestamp(parseInt(badges.BADGE_DRY_ICE.mintedTimestamp)),
        },
      ];
    } else {
      return getDefaultResponse(seasonId);
    }
  } catch (error) {
    console.error('Error in fetching the bagde information of this address');
    return getDefaultResponse(seasonId);
  }
}
