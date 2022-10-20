import { GraphQLClient, gql } from 'graphql-request';

export type BadgeVariant =
  | 'degenStuff'
  | 'deltaDegen'
  | 'irsConnoisseur'
  | 'leverageCrowbar'
  | 'noRiskHereSer'
  | 'sushiRoll'
  | 'seasonedTrader'
  | 'beWaterMyFriend'
  | 'rainMaker'
  | 'waterHose'
  | 'moneyMoneyMoney'
  | 'lpoor'
  | 'yikes'
  | 'maxBidding'
  | 'okBoomer'
  | 'dryIce';

export type CollectionBadge = {
  variant: BadgeVariant;
  achievedAt?: number;
};

export type ClaimedBadge = {
  variant: BadgeVariant;
};

const getBadgesQueryString = (owner: string) => `
{
  users(where: {id: "${owner.toLowerCase()}"}) {
    id
    BADGE_NO_RISK_HERE_SER
    BADGE_DELTA_DEGEN
    BADGE_LEVERAGE_CROWBAR
    BADGE_IRS_CONNOISSEUR
    BADGE_SUSHI_ROLL
    BADGE_DEGEN_STUFF
    BADGE_OK_BOOMER
    BADGE_LPOOR
    BADGE_MONEY_MONEY_MONEY
    BADGE_WATER_HOSE
    BADGE_RAIN_MAKER
    BADGE_DRY_ICE
  }
}
`;

const formatTimestamp = (timestamp: number): number | undefined => {
  if (timestamp === 0) {
    return undefined;
  }

  return timestamp * 1000;
};

type BadgesQueryResponse = {
  users: {
    BADGE_NO_RISK_HERE_SER: string;
    BADGE_DELTA_DEGEN: string;
    BADGE_LEVERAGE_CROWBAR: string;
    BADGE_IRS_CONNOISSEUR: string;
    BADGE_SUSHI_ROLL: string;
    BADGE_DEGEN_STUFF: string;
    BADGE_OK_BOOMER: string;
    BADGE_LPOOR: string;
    BADGE_MONEY_MONEY_MONEY: string;
    BADGE_WATER_HOSE: string;
    BADGE_RAIN_MAKER: string;
    BADGE_DRY_ICE: string;
  }[];
};

export type GetProfileBadgesResponse = {
  achievedBadges: CollectionBadge[];
  claimedBadges: ClaimedBadge[];
};

const DEFAULT_RESPONSE: GetProfileBadgesResponse = {
  achievedBadges: [
    {
      variant: 'noRiskHereSer',
    },
    {
      variant: 'deltaDegen',
    },
    {
      variant: 'leverageCrowbar',
    },
    {
      variant: 'irsConnoisseur',
    },
    {
      variant: 'sushiRoll',
    },
    {
      variant: 'degenStuff',
    },
    {
      variant: 'seasonedTrader',
    },
    {
      variant: 'okBoomer',
    },
    {
      variant: 'maxBidding',
    },
    {
      variant: 'yikes',
    },
    {
      variant: 'lpoor',
    },
    {
      variant: 'moneyMoneyMoney',
    },
    {
      variant: 'waterHose',
    },
    {
      variant: 'rainMaker',
    },
    {
      variant: 'beWaterMyFriend',
    },
    {
      variant: 'dryIce',
    },
  ],
  claimedBadges: [],
};

export async function getProfileBadges(owner: string): Promise<GetProfileBadgesResponse> {
  if (!process.env.REACT_APP_SUBGRAPH_BADGES_URL) {
    return DEFAULT_RESPONSE;
  }
  try {
    const graphQLClient = new GraphQLClient(process.env.REACT_APP_SUBGRAPH_BADGES_URL);

    const data: BadgesQueryResponse = await graphQLClient.request(
      gql`
        ${getBadgesQueryString(owner)}
      `,
    );

    const badgesBatch = data;

    if (badgesBatch.users.length > 0) {
      const badges = badgesBatch.users[0];

      return {
        achievedBadges: [
          {
            variant: 'noRiskHereSer',
            achievedAt: formatTimestamp(parseInt(badges.BADGE_NO_RISK_HERE_SER)),
          },
          {
            variant: 'deltaDegen',
            achievedAt: formatTimestamp(parseInt(badges.BADGE_DELTA_DEGEN)),
          },
          {
            variant: 'leverageCrowbar',
            achievedAt: formatTimestamp(parseInt(badges.BADGE_LEVERAGE_CROWBAR)),
          },
          {
            variant: 'irsConnoisseur',
            achievedAt: formatTimestamp(parseInt(badges.BADGE_IRS_CONNOISSEUR)),
          },
          {
            variant: 'sushiRoll',
            achievedAt: formatTimestamp(parseInt(badges.BADGE_SUSHI_ROLL)),
          },
          {
            variant: 'degenStuff',
            achievedAt: formatTimestamp(parseInt(badges.BADGE_DEGEN_STUFF)),
          },
          {
            variant: 'seasonedTrader',
          },
          {
            variant: 'okBoomer',
            achievedAt: formatTimestamp(parseInt(badges.BADGE_OK_BOOMER)),
          },
          {
            variant: 'maxBidding',
          },
          {
            variant: 'yikes',
          },
          {
            variant: 'lpoor',
            achievedAt: formatTimestamp(parseInt(badges.BADGE_LPOOR)),
          },
          {
            variant: 'moneyMoneyMoney',
            achievedAt: formatTimestamp(parseInt(badges.BADGE_MONEY_MONEY_MONEY)),
          },
          {
            variant: 'waterHose',
            achievedAt: formatTimestamp(parseInt(badges.BADGE_WATER_HOSE)),
          },
          {
            variant: 'rainMaker',
            achievedAt: formatTimestamp(parseInt(badges.BADGE_RAIN_MAKER)),
          },
          {
            variant: 'beWaterMyFriend',
          },
          {
            variant: 'dryIce',
            achievedAt: formatTimestamp(parseInt(badges.BADGE_DRY_ICE)),
          },
        ],
        claimedBadges: [],
      };
    } else {
      return DEFAULT_RESPONSE;
    }
  } catch (error) {
    console.error('Error in fetching the bagde information of this address');
    return DEFAULT_RESPONSE;
  }
}
