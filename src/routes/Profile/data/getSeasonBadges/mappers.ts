import { Season } from '../../../../hooks/season/types';
import { BadgeVariant, NonProgrammaticBadges } from './types';

export const BADGE_TYPE_BADGE_VARIANT_MAP: Record<string, BadgeVariant> = {
  // season 1
  '16': 'fixedTrader',
  '17': 'deltaDegen',
  '18': 'leverageCrowbar',
  '19': 'irsConnoisseur',
  '20': 'sushiRoll',
  '21': 'degenStuff',
  '22': 'okBoomer',
  '23': 'lpoor',
  '24': 'moneyMoneyMoney',
  '25': 'waterHose',
  '26': 'rainMaker',
  '27': 'dryIce',
  '28': 'beWaterMyFriend',
  '29': 'yikes',
  '30': 'maxBidding',
  '31': 'topTrader',
  '32': 'mellowLpVault',
  // season OG
  '0': 'ogFixedTrader',
  '1': 'ogDeltaDegen',
  '2': 'ogLeverageCrowbar',
  '3': 'ogIrsConnoisseur',
  '4': 'ogSushiRoll',
  '5': 'ogDegenStuff',
  '6': 'ogOkBoomer',
  '7': 'ogLpoor',
  '8': 'ogMoneyMoneyMoney',
  '9': 'ogWaterHose',
  '10': 'ogRainMaker',
  '11': 'ogDryIce',
  '12': 'ogBeWaterMyFriend',
  '13': 'ogYikes',
  '14': 'ogMaxBidding',
  '15': 'ogTopTrader',
  // season 2
  '43': 's2FixedTrader',
  '44': 's2DeltaDegen',
  '45': 's2LeverageCrowbar',
  '46': 's2IrsConnoisseur',
  '47': 's2SushiRoll',
  '48': 's2DegenStuff',
  '49': 's2Lpoor',
  '50': 's2MoneyMoneyMoney',
  '51': 's2WaterHose',
  '52': 's2RainMaker',
  '53': 's2BeWaterMyFriend',
  '54': 's2Yikes',
  '55': 's2MaxBidding',
  '56': 's2TopTrader',
  '63': 's2MellowLpVaultTier1',
  '64': 's2MellowLpVaultTier2',
  '65': 's2MellowLpVaultTier3',
  // season1, season2 & og non-programmatic badges
  '34': 'governorz',
  '33': 'diplomatz',
  '35': 'senatorz',
  '36': 'referror',
  '37': 'notionalInfluencer',
  '38': 'whaleWhisperer',
  '58': 'governorz',
  '57': 'diplomatz',
  '59': 'senatorz',
  '60': 'referror',
  '61': 'notionalInfluencer',
  '62': 'whaleWhisperer',
};

export const NON_PROGRAMMATIC_BADGES_DISCORD: NonProgrammaticBadges[] = [
  'governorz',
  'diplomatz',
  'senatorz',
];

export const NON_PROGRAMMATIC_BADGES: NonProgrammaticBadges[] = [
  ...NON_PROGRAMMATIC_BADGES_DISCORD,
  'referror',
  'notionalInfluencer',
  'whaleWhisperer',
];

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
    ...NON_PROGRAMMATIC_BADGES,
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
    ...NON_PROGRAMMATIC_BADGES,
  ],
  2: [
    's2FixedTrader',
    's2DeltaDegen',
    's2LeverageCrowbar',
    's2IrsConnoisseur',
    's2SushiRoll',
    's2DegenStuff',
    's2Lpoor',
    's2MoneyMoneyMoney',
    's2WaterHose',
    's2RainMaker',
    's2BeWaterMyFriend',
    's2Yikes',
    's2MaxBidding',
    's2TopTrader',
    's2MellowLpVaultTier1',
    's2MellowLpVaultTier2',
    's2MellowLpVaultTier3',
    ...NON_PROGRAMMATIC_BADGES,
  ],
  3: [],
  4: [],
  5: [],
};
