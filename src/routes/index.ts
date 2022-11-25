export const routes = {
  LP_PORTFOLIO: 'lp-positions',
  LP_POOLS: 'lp-pools',
  PORTFOLIO: 'portfolio',
  TRADER_POOLS: 'trader-pools',
  WELCOME: 'welcome',
  BORROW_POS: 'borrow-positions',
  TRADING_LEAGUE: 'trading-league',
  PROFILE: 'profile',
  LP_OPTIMISERS: 'lp-optimisers',
};

export * from './LPPools/LPPools';
export * from './LPPortfolio/LPPortfolio';
export * from './TraderPools/TraderPools';
export * from './Portfolio/Portfolio';
export * from './FixedBorrower/FixedBorrower';
export * from './TradingLeague/TradingLeague';
export * from './Profile/Profile';
export * from './ProfileV1/Profile';
export * from './Ecosystem/Ecosystem';
