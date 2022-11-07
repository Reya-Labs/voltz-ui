import { BadgeVariant } from './types';
import { Season } from '../../../hooks/season/types';

export const BADGE_TYPE_BADGE_VARIANT_MAP: Record<string, BadgeVariant> = {
  // season 1
  '12': 'fixedTrader',
  '13': 'deltaDegen',
  '14': 'leverageCrowbar',
  '15': 'irsConnoisseur',
  '16': 'sushiRoll',
  '17': 'degenStuff',
  '18': 'okBoomer',
  '19': 'lpoor',
  '20': 'moneyMoneyMoney',
  '21': 'waterHose',
  '22': 'rainMaker',
  '23': 'dryIce',
  '24': 'beWaterMyFriend',
  '25': 'yikes',
  '26': 'maxBidding',
  '27': 'topTrader',
  // todo: change with correct BE enum value
  '100000': 'mellowLpVault',
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
  '28': 'ogBeWaterMyFriend',
  '29': 'ogYikes',
  '30': 'ogMaxBidding',
  '31': 'ogTopTrader',
};

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
