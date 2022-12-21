import { Season } from '../../../../hooks/season/types';
import { BadgeVariant } from '../../data/getSeasonBadges';

type CollectionBadge = {
  variant: BadgeVariant;
  achievedAt?: number;
};

export const mockBadges: Record<Season['id'], CollectionBadge[]> = {
  0: [
    {
      variant: 'ogFixedTrader',
      achievedAt: new Date().valueOf(),
    },
    {
      variant: 'ogDeltaDegen',
      achievedAt: new Date().valueOf(),
    },
    {
      variant: 'ogLeverageCrowbar',
      achievedAt: new Date().valueOf(),
    },
    {
      variant: 'ogIrsConnoisseur',
      achievedAt: new Date().valueOf(),
    },
    {
      variant: 'ogSushiRoll',
      achievedAt: new Date().valueOf(),
    },
    {
      variant: 'ogDegenStuff',
      achievedAt: new Date().valueOf(),
    },
    {
      variant: 'ogTopTrader',
      achievedAt: new Date().valueOf(),
    },
    {
      variant: 'ogOkBoomer',
      achievedAt: new Date().valueOf(),
    },
    {
      variant: 'ogMaxBidding',
      achievedAt: new Date().valueOf(),
    },
    {
      variant: 'ogYikes',
      achievedAt: new Date().valueOf(),
    },
    {
      variant: 'ogLpoor',
      achievedAt: new Date().valueOf(),
    },
    {
      variant: 'ogMoneyMoneyMoney',
      achievedAt: new Date().valueOf(),
    },
    {
      variant: 'ogWaterHose',
      achievedAt: new Date().valueOf(),
    },
    {
      variant: 'ogRainMaker',
      achievedAt: new Date().valueOf(),
    },
    {
      variant: 'ogBeWaterMyFriend',
      achievedAt: new Date().valueOf(),
    },
    {
      variant: 'ogDryIce',
      achievedAt: new Date().valueOf(),
    },
  ],
  1: [
    {
      variant: 'fixedTrader',
      achievedAt: new Date('02/02/2022').valueOf(),
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
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'okBoomer',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'maxBidding',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'yikes',
      achievedAt: new Date('02/02/2022').valueOf(),
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
    {
      variant: 'mellowLpVault',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'mellowLpVaultTier1',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'mellowLpVaultTier2',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'mellowLpVaultTier3',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: '0BCMellowLpVault',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'governorz',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'senatorz',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'diplomatz',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'whaleWhisperer',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'notionalInfluencer',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'referror',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
  ],
  2: [
    {
      variant: 's2FixedTrader',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 's2DeltaDegen',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 's2LeverageCrowbar',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 's2IrsConnoisseur',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 's2SushiRoll',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 's2DegenStuff',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 's2TopTrader',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 's2MaxBidding',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 's2Yikes',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 's2Lpoor',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 's2MoneyMoneyMoney',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 's2WaterHose',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 's2RainMaker',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 's2BeWaterMyFriend',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 's2MellowLpVaultTier1',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 's2MellowLpVaultTier2',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 's2MellowLpVaultTier3',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'governorz',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'senatorz',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'diplomatz',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'whaleWhisperer',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'notionalInfluencer',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
    {
      variant: 'referror',
      achievedAt: new Date('02/02/2022').valueOf(),
    },
  ],
  3: [],
  4: [],
  5: [],
};
