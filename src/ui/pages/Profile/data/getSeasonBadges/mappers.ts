import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { Season } from '../../../../../hooks/season/types';
import { BadgeVariant, NonProgrammaticBadges } from './types';

type BadgeTypeBadgeVariant = Record<string, BadgeVariant>;
const ethereumBadgeTypeBadgeVariantMap: BadgeTypeBadgeVariant = {
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
  '39': 'mellowLpVaultTier1',
  '40': 'mellowLpVaultTier2',
  '41': 'mellowLpVaultTier3',
  '42': '0BCMellowLpVault',
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
  // season 3
  '66': 's3FixedTrader',
  '67': 's3DeltaDegen',
  '68': 's3LeverageCrowbar',
  '69': 's3IrsConnoisseur',
  '70': 's3SushiRoll',
  '71': 's3DegenStuff',
  '72': 's3Lpoor',
  '73': 's3MoneyMoneyMoney',
  '74': 's3WaterHose',
  '75': 's3RainMaker',
  '76': 's3BeWaterMyFriend',
  '77': 's3Yikes',
  '78': 's3MaxBidding',
  '79': 's3TopTrader',
  '86': 's3MellowLpVaultTier1',
  '87': 's3MellowLpVaultTier2',
  '88': 's3MellowLpVaultTier3',
  // season 4
  '89': 's4FixedTrader',
  '90': 's4DeltaDegen',
  '91': 's4LeverageCrowbar',
  '92': 's4IrsConnoisseur',
  '93': 's4SushiRoll',
  '94': 's4DegenStuff',
  '95': 's4Lpoor',
  '96': 's4MoneyMoneyMoney',
  '97': 's4WaterHose',
  '98': 's4RainMaker',
  '99': 's4BeWaterMyFriend',
  '100': 's4Yikes',
  '101': 's4MaxBidding',
  '102': 's4TopTrader',
  '109': 's4MellowLpVaultTier1',
  '110': 's4MellowLpVaultTier2',
  '111': 's4MellowLpVaultTier3',
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
  // season3
  '81': 'governorz',
  '80': 'diplomatz',
  '82': 'senatorz',
  '83': 'referror',
  '84': 'notionalInfluencer',
  '85': 'whaleWhisperer',
  // season4
  '104': 'governorz',
  '103': 'diplomatz',
  '105': 'senatorz',
  '106': 'referror',
  '107': 'notionalInfluencer',
  '108': 'whaleWhisperer',
};
const arbitrumTypeBadgeVariantMap: BadgeTypeBadgeVariant = {
  // season 3
  '66': 's3FixedTraderArbitrum',
  '67': 's3DeltaDegenArbitrum',
  '68': 's3LeverageCrowbarArbitrum',
  '69': 's3IrsConnoisseurArbitrum',
  '70': 's3SushiRollArbitrum',
  '71': 's3DegenStuffArbitrum',
  '72': 's3LpoorArbitrum',
  '73': 's3MoneyMoneyMoneyArbitrum',
  '74': 's3WaterHoseArbitrum',
  '75': 's3RainMakerArbitrum',
  '76': 's3BeWaterMyFriendArbitrum',
  '77': 's3YikesArbitrum',
  '78': 's3MaxBiddingArbitrum',
  '79': 's3TopTraderArbitrum',
  '86': 's3MellowLpVaultTier1Arbitrum',
  '87': 's3MellowLpVaultTier2Arbitrum',
  '88': 's3MellowLpVaultTier3Arbitrum',
  // season 4
  '89': 's4FixedTraderArbitrum',
  '90': 's4DeltaDegenArbitrum',
  '91': 's4LeverageCrowbarArbitrum',
  '92': 's4IrsConnoisseurArbitrum',
  '93': 's4SushiRollArbitrum',
  '94': 's4DegenStuffArbitrum',
  '95': 's4LpoorArbitrum',
  '96': 's4MoneyMoneyMoneyArbitrum',
  '97': 's4WaterHoseArbitrum',
  '98': 's4RainMakerArbitrum',
  '99': 's4BeWaterMyFriendArbitrum',
  '100': 's4YikesArbitrum',
  '101': 's4MaxBiddingArbitrum',
  '102': 's4TopTraderArbitrum',
  '109': 's4MellowLpVaultTier1Arbitrum',
  '110': 's4MellowLpVaultTier2Arbitrum',
  '111': 's4MellowLpVaultTier3Arbitrum',
  // TODO: Ioana add the BE ids
  '-1': 's4UK',
  '-2': 's4VoltzGlp',
  '-3': 's4VoltzAave',
  '-4': 's4Tatsu',
};
const avalancheTypeBadgeVariantMap: BadgeTypeBadgeVariant = {};
const spruceTypeBadgeVariantMap: BadgeTypeBadgeVariant = {};
export const BADGE_TYPE_BADGE_VARIANT_MAP: Record<SupportedChainId, BadgeTypeBadgeVariant> = {
  [SupportedChainId.mainnet]: ethereumBadgeTypeBadgeVariantMap,
  [SupportedChainId.goerli]: ethereumBadgeTypeBadgeVariantMap,
  [SupportedChainId.arbitrum]: arbitrumTypeBadgeVariantMap,
  [SupportedChainId.arbitrumGoerli]: arbitrumTypeBadgeVariantMap,
  [SupportedChainId.avalanche]: avalancheTypeBadgeVariantMap,
  [SupportedChainId.avalancheFuji]: avalancheTypeBadgeVariantMap,
  [SupportedChainId.spruce]: spruceTypeBadgeVariantMap,
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

type SeasonBadgeVariants = Record<`${Season['id']}`, string[]>;
const etherumChainSeasonBadgeVariants: SeasonBadgeVariants = {
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
    '0BCMellowLpVault',
    'mellowLpVault',
    'mellowLpVaultTier1',
    'mellowLpVaultTier2',
    'mellowLpVaultTier3',
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
  3: [
    's3FixedTrader',
    's3DeltaDegen',
    's3LeverageCrowbar',
    's3IrsConnoisseur',
    's3SushiRoll',
    's3DegenStuff',
    's3Lpoor',
    's3MoneyMoneyMoney',
    's3WaterHose',
    's3RainMaker',
    's3BeWaterMyFriend',
    's3Yikes',
    's3MaxBidding',
    's3TopTrader',
    's3MellowLpVaultTier1',
    's3MellowLpVaultTier2',
    's3MellowLpVaultTier3',
    ...NON_PROGRAMMATIC_BADGES,
  ],
  4: [
    's4FixedTrader',
    's4DeltaDegen',
    's4LeverageCrowbar',
    's4IrsConnoisseur',
    's4SushiRoll',
    's4DegenStuff',
    's4Lpoor',
    's4MoneyMoneyMoney',
    's4WaterHose',
    's4RainMaker',
    's4BeWaterMyFriend',
    's4Yikes',
    's4MaxBidding',
    's4TopTrader',
    's4MellowLpVaultTier1',
    's4MellowLpVaultTier2',
    's4MellowLpVaultTier3',
    ...NON_PROGRAMMATIC_BADGES,
  ],
  5: [],
};
const arbitrumChainSeasonBadgeVariants: SeasonBadgeVariants = {
  0: [],
  1: [],
  2: [],
  3: [
    's3FixedTraderArbitrum',
    's3DeltaDegenArbitrum',
    's3LeverageCrowbarArbitrum',
    's3IrsConnoisseurArbitrum',
    's3SushiRollArbitrum',
    's3DegenStuffArbitrum',
    's3LpoorArbitrum',
    's3MoneyMoneyMoneyArbitrum',
    's3WaterHoseArbitrum',
    's3RainMakerArbitrum',
    's3BeWaterMyFriendArbitrum',
    's3YikesArbitrum',
    's3MaxBiddingArbitrum',
    's3TopTraderArbitrum',
  ],
  4: [
    's4FixedTraderArbitrum',
    's4DeltaDegenArbitrum',
    's4LeverageCrowbarArbitrum',
    's4IrsConnoisseurArbitrum',
    's4SushiRollArbitrum',
    's4DegenStuffArbitrum',
    's4LpoorArbitrum',
    's4MoneyMoneyMoneyArbitrum',
    's4WaterHoseArbitrum',
    's4RainMakerArbitrum',
    's4BeWaterMyFriendArbitrum',
    's4YikesArbitrum',
    's4MaxBiddingArbitrum',
    's4TopTraderArbitrum',
    's4Tatsu',
    's4UK',
    's4VoltzAave',
    's4VoltzGlp',
  ],
  5: [],
};
const avalancheChainSeasonBadgeVariants: SeasonBadgeVariants = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
};
const spurceChainSeasonBadgeVariants: SeasonBadgeVariants = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
};
export const CHAIN_SEASON_BADGE_VARIANTS: Record<SupportedChainId, SeasonBadgeVariants> = {
  [SupportedChainId.mainnet]: etherumChainSeasonBadgeVariants,
  [SupportedChainId.goerli]: etherumChainSeasonBadgeVariants,
  [SupportedChainId.arbitrum]: arbitrumChainSeasonBadgeVariants,
  [SupportedChainId.arbitrumGoerli]: arbitrumChainSeasonBadgeVariants,
  [SupportedChainId.avalanche]: avalancheChainSeasonBadgeVariants,
  [SupportedChainId.avalancheFuji]: avalancheChainSeasonBadgeVariants,
  [SupportedChainId.spruce]: spurceChainSeasonBadgeVariants,
};
