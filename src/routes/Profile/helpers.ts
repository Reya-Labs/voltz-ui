import { BadgeTier } from './types';
import { BadgeVariant } from '@graphql';

export const TIER_COPY_MAP: Record<BadgeTier, string> = {
  tier1: 'TIER 1',
  tier2: 'TIER 2',
  tier3: 'TIER 3',
  legendary: 'LEGENDARY',
  easterEgg: 'EASTER EGG',
};

export const BADGE_VARIANT_TITLE_COPY_MAP: Record<BadgeVariant, string> = {
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
  sugarDaddy: 'SUGAR DADDY',
  maxBidding: 'MAX BIDDING',
  okBoomer: 'OK BOOMER',
  dryIce: 'DRY ICE',
};

export const BADGE_VARIANT_DESCRIPTION_COPY_MAP: Record<BadgeVariant, string> = {
  degenStuff: 'Taking no risks, opening your first Fixed Taker position.',
  deltaDegen: 'Taking no risks, opening your first Fixed Taker position.',
  irsConnoisseur: 'Taking no risks, opening your first Fixed Taker position.',
  leverageCrowbar: 'Taking no risks, opening your first Fixed Taker position.',
  noRiskHereSer: 'Taking no risks, opening your first Fixed Taker position.',
  sushiRoll: 'Taking no risks, opening your first Fixed Taker position.',
  seasonedTrader: 'Taking no risks, opening your first Fixed Taker position.',
  beWaterMyFriend: 'Taking no risks, opening your first Fixed Taker position.',
  rainMaker: 'Taking no risks, opening your first Fixed Taker position.',
  waterHose: 'Taking no risks, opening your first Fixed Taker position.',
  moneyMoneyMoney: 'Taking no risks, opening your first Fixed Taker position.',
  lpoor: 'Taking no risks, opening your first Fixed Taker position.',
  sugarDaddy: 'Taking no risks, opening your first Fixed Taker position.',
  maxBidding: 'Taking no risks, opening your first Fixed Taker position.',
  okBoomer: 'Taking no risks, opening your first Fixed Taker position.',
  dryIce: 'Taking no risks, opening your first Fixed Taker position.',
};

export const BADGE_VARIANT_TIER_MAP: Record<BadgeVariant, BadgeTier> = {
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
  sugarDaddy: 'easterEgg',
  maxBidding: 'easterEgg',
  okBoomer: 'easterEgg',
  dryIce: 'easterEgg',
};
