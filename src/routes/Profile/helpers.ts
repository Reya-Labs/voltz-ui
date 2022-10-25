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
  noRiskHereSer: 'trader',
  sushiRoll: 'trader',
  seasonedTrader: 'trader',
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
  noRiskHereSer: 'NO RISK HERE SER',
  sushiRoll: 'SUSHI ROLL',
  seasonedTrader: 'SEASONED TRADER',
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
  degenStuff: "You went big and it's been noticed.",
  deltaDegen: 'You went variable, degen status incoming.',
  irsConnoisseur: 'You have entered many positions now ser.',
  leverageCrowbar: 'Woah you like the leverage.',
  noRiskHereSer: 'Nice and stable with a fixed taker position.',
  sushiRoll: 'Keep rolling rolling rolling.',
  seasonedTrader: 'A top 5 leaderboard finish this season.',
  beWaterMyFriend: 'A top 5 Liquidity Provider finish this season.',
  rainMaker: 'You went big on liquidity and it got noticed.',
  waterHose: 'You have provided much liquidity now ser.',
  moneyMoneyMoney: 'You sure know how to provide liquidity.',
  lpoor: 'Protocol just got a little more liquid.',
  yikes: 'Oof you’re the largest liquidation this season.',
  maxBidding: 'You went all out on leverage.',
  okBoomer: 'We all start somewhere, you just started small.',
  dryIce: 'LPs can start small too.',
};

export const BADGE_VARIANT_TIER_MAP: Record<BadgeVariant | ComingSoonBadges, BadgeTier> = {
  degenStuff: 'tier3',
  deltaDegen: 'tier1',
  irsConnoisseur: 'tier2',
  leverageCrowbar: 'tier2',
  noRiskHereSer: 'tier1',
  sushiRoll: 'tier2',
  seasonedTrader: 'legendary',
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
