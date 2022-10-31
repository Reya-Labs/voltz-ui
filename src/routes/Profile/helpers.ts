import { BadgeTier, ComingSoonBadges } from './types';
import { BadgeVariant } from '@graphql';
import { Season } from '../../hooks/season/types';

export const BADGE_VARIANT_TRADER_LP_MAP: Record<
  BadgeVariant | ComingSoonBadges,
  'trader' | 'lp' | ''
> = {
  // season 1
  degenStuff: 'trader',
  deltaDegen: 'trader',
  irsConnoisseur: 'trader',
  leverageCrowbar: 'trader',
  fixedTrader: 'trader',
  sushiRoll: 'trader',
  topTrader: 'trader',
  beWaterMyFriend: 'lp',
  rainMaker: 'lp',
  waterHose: 'lp',
  moneyMoneyMoney: 'lp',
  lpoor: 'lp',
  yikes: 'trader',
  maxBidding: 'trader',
  okBoomer: 'trader',
  dryIce: 'lp',
  // season 1
  ogDegenStuff: 'trader',
  ogDeltaDegen: 'trader',
  ogIrsConnoisseur: 'trader',
  ogLeverageCrowbar: 'trader',
  ogFixedTrader: 'trader',
  ogSushiRoll: 'trader',
  ogTopTrader: 'trader',
  ogBeWaterMyFriend: 'lp',
  ogRainMaker: 'lp',
  ogWaterHose: 'lp',
  ogMoneyMoneyMoney: 'lp',
  ogLpoor: 'lp',
  ogYikes: 'trader',
  ogMaxBidding: 'trader',
  ogOkBoomer: 'trader',
  ogDryIce: 'lp',
  // coming soon...
  governorz: '',
  diplomatz: '',
  senatorz: '',
  theOgActivity: '',
};

export const TIER_COPY_MAP: Record<BadgeTier, string> = {
  tier1: 'TIER 1',
  tier2: 'TIER 2',
  tier3: 'TIER 3',
  legendary: 'LEGENDARY',
  easterEgg: 'EASTER EGG',
};

export const BADGE_VARIANT_TITLE_COPY_MAP: Record<BadgeVariant | ComingSoonBadges, string> = {
  // season
  degenStuff: 'DEGEN STUFF',
  deltaDegen: 'DELTA DEGEN',
  irsConnoisseur: 'IRS CONNOISSEUR',
  leverageCrowbar: 'LEVERAGE CROWBAR',
  fixedTrader: 'FIXED TAKER',
  sushiRoll: 'SUSHI ROLL',
  topTrader: 'TOP TRADER',
  beWaterMyFriend: 'BE WATER MY FRIEND',
  rainMaker: 'RAIN MAKER',
  waterHose: 'WATER HOSE',
  moneyMoneyMoney: 'MONEY MONEY MONEY',
  lpoor: 'LPOOR',
  yikes: 'YIKES',
  maxBidding: 'MAX BIDDING',
  okBoomer: 'OK BOOMER',
  dryIce: 'DRY ICE',
  // season OG
  ogDegenStuff: 'DEGEN STUFF',
  ogDeltaDegen: 'DELTA DEGEN',
  ogIrsConnoisseur: 'IRS CONNOISSEUR',
  ogLeverageCrowbar: 'LEVERAGE CROWBAR',
  ogFixedTrader: 'FIXED TAKER',
  ogSushiRoll: 'SUSHI ROLL',
  ogTopTrader: 'TOP TRADER',
  ogBeWaterMyFriend: 'BE WATER MY FRIEND',
  ogRainMaker: 'RAIN MAKER',
  ogWaterHose: 'WATER HOSE',
  ogMoneyMoneyMoney: 'MONEY MONEY MONEY',
  ogLpoor: 'LPOOR',
  ogYikes: 'YIKES',
  ogMaxBidding: 'MAX BIDDING',
  ogOkBoomer: 'OK BOOMER',
  ogDryIce: 'DRY ICE',
  // coming soon...
  governorz: 'GOVERNORZ',
  diplomatz: 'DIPLOMATZ',
  senatorz: 'SENATORZ',
  theOgActivity: 'THE OG ACTIVITY',
};

export const BADGE_VARIANT_DESCRIPTION_COPY_MAP: Record<BadgeVariant, string> = {
  // season 1
  degenStuff: '500k+ is serious levels of notional. Hats off to the degen king.',
  deltaDegen: 'Only degens can see the delta on that variable position.',
  irsConnoisseur: 'A true degen acts like a pro and has at least 3+ positions.',
  leverageCrowbar: 'There is no degen without 100x leverage, and you are a degen.',
  fixedTrader: 'Comfy and stable with a fixed taker position.',
  sushiRoll: 'Stopping for nothing, rolling over the next pool.',
  topTrader: 'Top 5 finisher during this season. View from the top looks nice.',
  beWaterMyFriend: 'A top 5 Liquidity Provider finish this season.',
  rainMaker: 'No luck needed for the degen gods. Going big 500k+ notional provided.',
  waterHose: 'You left no pool unturned, provided liquidity to 3+ pools.',
  moneyMoneyMoney: '100k leverage. You provided real liquidity here, market maker status.',
  lpoor: 'You provided liquidity and the protocol just got a little more robust.',
  yikes: 'Oof you’re the largest liquidation this season. There was no second best.',
  maxBidding: 'There is only one button on your keyboard: max bidding, max leverage',
  okBoomer: '2x leverage is OK. We all start somewhere, you just started small.',
  dryIce: 'Providing liquidity but below 2x notional.',
  // season OG
  ogDegenStuff: '500k+ is serious levels of notional. Hats off to the degen king.',
  ogDeltaDegen: 'Only degens can see the delta on that variable position.',
  ogIrsConnoisseur: 'A true degen acts like a pro and has at least 3+ positions.',
  ogLeverageCrowbar: 'There is no degen without 100x leverage, and you are a degen.',
  ogFixedTrader: 'Comfy and stable with a fixed taker position.',
  ogSushiRoll: 'Stopping for nothing, rolling over the next pool.',
  ogTopTrader: 'Top 5 finisher during this season. View from the top looks nice.',
  ogBeWaterMyFriend: 'A top 5 Liquidity Provider finish this season.',
  ogRainMaker: 'No luck needed for the degen gods. Going big 500k+ notional provided.',
  ogWaterHose: 'You left no pool unturned, provided liquidity to 3+ pools.',
  ogMoneyMoneyMoney: '100k leverage. You provided real liquidity here, market maker status.',
  ogLpoor: 'You provided liquidity and the protocol just got a little more robust.',
  ogYikes: 'Oof you’re the largest liquidation this season. There was no second best.',
  ogMaxBidding: 'There is only one button on your keyboard: max bidding, max leverage',
  ogOkBoomer: '2x leverage is OK. We all start somewhere, you just started small.',
  ogDryIce: 'Providing liquidity but below 2x notional.',
};

export const BADGE_VARIANT_TIER_MAP: Record<BadgeVariant | ComingSoonBadges, BadgeTier> = {
  // season 1
  degenStuff: 'tier3',
  deltaDegen: 'tier1',
  irsConnoisseur: 'tier2',
  leverageCrowbar: 'tier2',
  fixedTrader: 'tier1',
  sushiRoll: 'tier2',
  topTrader: 'legendary',
  beWaterMyFriend: 'legendary',
  rainMaker: 'tier3',
  waterHose: 'tier2',
  moneyMoneyMoney: 'tier2',
  lpoor: 'tier1',
  yikes: 'easterEgg',
  maxBidding: 'easterEgg',
  okBoomer: 'easterEgg',
  dryIce: 'easterEgg',
  // season og
  ogDegenStuff: 'tier3',
  ogDeltaDegen: 'tier1',
  ogIrsConnoisseur: 'tier2',
  ogLeverageCrowbar: 'tier2',
  ogFixedTrader: 'tier1',
  ogSushiRoll: 'tier2',
  ogTopTrader: 'legendary',
  ogBeWaterMyFriend: 'legendary',
  ogRainMaker: 'tier3',
  ogWaterHose: 'tier2',
  ogMoneyMoneyMoney: 'tier2',
  ogLpoor: 'tier1',
  ogYikes: 'easterEgg',
  ogMaxBidding: 'easterEgg',
  ogOkBoomer: 'easterEgg',
  ogDryIce: 'easterEgg',
  // coming soon...
  governorz: 'tier1',
  diplomatz: 'tier2',
  senatorz: 'tier3',
  theOgActivity: 'legendary',
};

export const COMING_SOON_BADGES: ComingSoonBadges[] = [
  'governorz',
  'diplomatz',
  'senatorz',
  'theOgActivity',
];

export const SEASON_BADGE_VARIANTS: Record<`${Season['id']}`, string[]> = {
  og: [
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
  s1: [
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
    'moneyMoneyMoney',
    'waterHose',
    'rainMaker',
    'beWaterMyFriend',
  ],
  s2: [],
  s3: [],
  s4: [],
  s5: [],
};
