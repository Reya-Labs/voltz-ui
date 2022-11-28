import { gql, GraphQLClient } from 'graphql-request';

import { Season } from '../../../hooks/season/types';

export type BadgeVariant1 =
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
  variant: BadgeVariant1;
  achievedAt?: number;
};

export type ClaimedBadge = {
  variant: BadgeVariant1;
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

export type GetProfileBadgesResponse1 = {
  achievedBadges: CollectionBadge[];
  claimedBadges: ClaimedBadge[];
};

const DEFAULT_RESPONSE: GetProfileBadgesResponse1 = {
  achievedBadges: [
    {
      variant: 'fixedTrader',
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
      variant: 'topTrader',
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

export async function getPhase1Badges(owner: string): Promise<GetProfileBadgesResponse1> {
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
            variant: 'fixedTrader',
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
            variant: 'topTrader',
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

export const SEASON_BADGE_VARIANTS: Record<`${Season['id']}`, string[]> = {
  0: [
    'ogFixedTrader',
    'ogDeltaDegen',
    'ogLeverageCrowbar',
    'ogIrsConnoisseur',
    'ogSushiRoll',
    'ogDegenStuff',
    'ogTopTrader',
    'ogOkBoomer',
    'ogDryIce',
    'ogMaxBidding',
    'ogYikes',
    'ogLpoor',
    'ogMoneyMoneyMoney',
    'ogWaterHose',
    'ogRainMaker',
    'ogBeWaterMyFriend',
  ],
  1: [
    'fixedTrader',
    'deltaDegen',
    'leverageCrowbar',
    'irsConnoisseur',
    'sushiRoll',
    'degenStuff',
    'topTrader',
    'okBoomer',
    'dryIce',
    'maxBidding',
    'yikes',
    'lpoor',
    'mellowLpVault',
    'moneyMoneyMoney',
    'waterHose',
    'rainMaker',
    'beWaterMyFriend',
  ],
  2: [],
  3: [],
  4: [],
  5: [],
};
