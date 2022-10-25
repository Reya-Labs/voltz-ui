import { BadgeTier, ComingSoonBadges } from './types';
import { BadgeVariant } from '@graphql';

export const BADGE_VARIANT_TRADER_LP_MAP: Record<
  BadgeVariant | ComingSoonBadges,
  'trader' | 'lp' | ''
> = {
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
  governorz: 'GOVERNORZ',
  diplomatz: 'DIPLOMATZ',
  senatorz: 'SENATORZ',
  theOgActivity: 'THE OG ACTIVITY',
};

export const BADGE_VARIANT_DESCRIPTION_COPY_MAP: Record<BadgeVariant, string> = {
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
};

export const BADGE_VARIANT_TIER_MAP: Record<BadgeVariant | ComingSoonBadges, BadgeTier> = {
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
