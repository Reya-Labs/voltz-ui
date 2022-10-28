export const routes = {
  LP_FARM: 'lp-positions',
  POOLS: 'lp-pools',
  PORTFOLIO: 'portfolio',
  SWAP: 'trader-pools',
  BORROW_POS: 'borrow-positions',
  TRM_POST: 'trm-post',
  TRADING_LEAGUE: 'trading-league',
  PROFILE: 'profile',
  ECOSYSTEM: 'ecosystem',
};

export { default as LiquidityProvider } from './LiquidityProvider/LiquidityProvider';
export { default as Trader } from './Trader/Trader';
export { default as FixedBorrower } from './FixedBorrower/FixedBorrower';
export { default as TradingLeague } from './TradingLeague/TradingLeague';
export { default as Profile } from './Profile/Profile';
export { default as Ecosystem } from './Ecosystem/Ecosystem';
