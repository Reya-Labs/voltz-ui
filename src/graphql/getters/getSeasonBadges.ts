import { GraphQLClient, gql } from 'graphql-request';

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

export type ClaimedBadge = {
  variant: BadgeVariant;
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

export type GetProfileBadgesResponse = {
  achievedBadges: CollectionBadge[];
  claimedBadges: ClaimedBadge[];
};

function DEFAULT_RESPONSE(seasonNumber: number): GetProfileBadgesResponse {
  return {
    achievedBadges: [
      {
        variant: mapForSeason(seasonNumber, 'fixedTrader'),
      },
      {
        variant: mapForSeason(seasonNumber, 'deltaDegen'),
      },
      {
        variant: mapForSeason(seasonNumber, 'leverageCrowbar'),
      },
      {
        variant: mapForSeason(seasonNumber, 'irsConnoisseur'),
      },
      {
        variant: mapForSeason(seasonNumber, 'sushiRoll'),
      },
      {
        variant: mapForSeason(seasonNumber, 'degenStuff'),
      },
      {
        variant: mapForSeason(seasonNumber, 'topTrader'),
      },
      {
        variant: mapForSeason(seasonNumber, 'okBoomer'),
      },
      {
        variant: mapForSeason(seasonNumber, 'maxBidding'),
      },
      {
        variant: mapForSeason(seasonNumber, 'yikes'),
      },
      {
        variant: mapForSeason(seasonNumber, 'lpoor'),
      },
      {
        variant: mapForSeason(seasonNumber, 'moneyMoneyMoney'),
      },
      {
        variant: mapForSeason(seasonNumber, 'waterHose'),
      },
      {
        variant: mapForSeason(seasonNumber, 'rainMaker'),
      },
      {
        variant: mapForSeason(seasonNumber, 'beWaterMyFriend'),
      },
      {
        variant: mapForSeason(seasonNumber, 'dryIce'),
      },
    ],
    claimedBadges: [],
  };
}

const mapForSeason = (seasonNumber: number, badgeVariant: string): BadgeVariant => {
  if (seasonNumber === 0) {
    return `og${badgeVariant[0].toUpperCase()}${badgeVariant.substring(1)}` as BadgeVariant;
  }
  return badgeVariant as BadgeVariant;
};
export async function getSeasonBadges(
  owner: string,
  seasonNumber: number,
): Promise<GetProfileBadgesResponse> {
  if (!process.env.REACT_APP_SUBGRAPH_BADGES_URL) {
    return DEFAULT_RESPONSE(seasonNumber);
  }
  try {
    const graphQLClient = new GraphQLClient(process.env.REACT_APP_SUBGRAPH_BADGES_URL);

    const data: BadgesQueryResponse = await graphQLClient.request(
      gql`
        ${getBadgesQueryString(owner, seasonNumber)}
      `,
    );

    const badgesBatch = data;

    if (badgesBatch.seasonUser) {
      const badges = badgesBatch.seasonUser;

      return {
        achievedBadges: [
          {
            variant: mapForSeason(seasonNumber, 'fixedTrader'),
            achievedAt: formatTimestamp(parseInt(badges.BADGE_NO_RISK_HERE_SER.awardedTimestamp)),
            claimedAt: formatTimestamp(parseInt(badges.BADGE_NO_RISK_HERE_SER.mintedTimestamp)),
          },
          {
            variant: mapForSeason(seasonNumber, 'deltaDegen'),
            achievedAt: formatTimestamp(parseInt(badges.BADGE_DELTA_DEGEN.awardedTimestamp)),
            claimedAt: formatTimestamp(parseInt(badges.BADGE_DELTA_DEGEN.mintedTimestamp)),
          },
          {
            variant: mapForSeason(seasonNumber, 'leverageCrowbar'),
            achievedAt: formatTimestamp(parseInt(badges.BADGE_LEVERAGE_CROWBAR.awardedTimestamp)),
            claimedAt: formatTimestamp(parseInt(badges.BADGE_LEVERAGE_CROWBAR.mintedTimestamp)),
          },
          {
            variant: mapForSeason(seasonNumber, 'irsConnoisseur'),
            achievedAt: formatTimestamp(parseInt(badges.BADGE_IRS_CONNOISSEUR.awardedTimestamp)),
            claimedAt: formatTimestamp(parseInt(badges.BADGE_IRS_CONNOISSEUR.mintedTimestamp)),
          },
          {
            variant: mapForSeason(seasonNumber, 'sushiRoll'),
            achievedAt: formatTimestamp(parseInt(badges.BADGE_SUSHI_ROLL.awardedTimestamp)),
            claimedAt: formatTimestamp(parseInt(badges.BADGE_SUSHI_ROLL.mintedTimestamp)),
          },
          {
            variant: mapForSeason(seasonNumber, 'degenStuff'),
            achievedAt: formatTimestamp(parseInt(badges.BADGE_DEGEN_STUFF.awardedTimestamp)),
            claimedAt: formatTimestamp(parseInt(badges.BADGE_DEGEN_STUFF.mintedTimestamp)),
          },
          {
            variant: mapForSeason(seasonNumber, 'topTrader'),
          },
          {
            variant: mapForSeason(seasonNumber, 'okBoomer'),
            achievedAt: formatTimestamp(parseInt(badges.BADGE_OK_BOOMER.awardedTimestamp)),
            claimedAt: formatTimestamp(parseInt(badges.BADGE_OK_BOOMER.mintedTimestamp)),
          },
          {
            variant: mapForSeason(seasonNumber, 'maxBidding'),
          },
          {
            variant: mapForSeason(seasonNumber, 'yikes'),
          },
          {
            variant: mapForSeason(seasonNumber, 'lpoor'),
            achievedAt: formatTimestamp(parseInt(badges.BADGE_LPOOR.awardedTimestamp)),
            claimedAt: formatTimestamp(parseInt(badges.BADGE_LPOOR.mintedTimestamp)),
          },
          {
            variant: mapForSeason(seasonNumber, 'moneyMoneyMoney'),
            achievedAt: formatTimestamp(parseInt(badges.BADGE_MONEY_MONEY_MONEY.awardedTimestamp)),
            claimedAt: formatTimestamp(parseInt(badges.BADGE_MONEY_MONEY_MONEY.mintedTimestamp)),
          },
          {
            variant: mapForSeason(seasonNumber, 'waterHose'),
            achievedAt: formatTimestamp(parseInt(badges.BADGE_WATER_HOSE.awardedTimestamp)),
            claimedAt: formatTimestamp(parseInt(badges.BADGE_WATER_HOSE.mintedTimestamp)),
          },
          {
            variant: mapForSeason(seasonNumber, 'rainMaker'),
            achievedAt: formatTimestamp(parseInt(badges.BADGE_RAIN_MAKER.awardedTimestamp)),
            claimedAt: formatTimestamp(parseInt(badges.BADGE_RAIN_MAKER.mintedTimestamp)),
          },
          {
            variant: mapForSeason(seasonNumber, 'beWaterMyFriend'),
          },
          {
            variant: mapForSeason(seasonNumber, 'dryIce'),
            achievedAt: formatTimestamp(parseInt(badges.BADGE_DRY_ICE.awardedTimestamp)),
            claimedAt: formatTimestamp(parseInt(badges.BADGE_DRY_ICE.mintedTimestamp)),
          },
        ],
        claimedBadges: [],
      };
    } else {
      return DEFAULT_RESPONSE(seasonNumber);
    }
  } catch (error) {
    console.error('Error in fetching the bagde information of this address');
    return DEFAULT_RESPONSE(seasonNumber);
  }
}
