export const routes = {
  LP_FARM: 'lp-positions',
  LP_POOLS: 'lp-pools',
  PORTFOLIO: 'portfolio',
  TRADER_POOLS: 'trader-pools',
  BORROW_POS: 'borrow-positions',
  TRADING_LEAGUE: 'trading-league',
  PROFILE: 'profile',
  LP_OPTIMISERS: 'lp-optimisers',
};

export { default as LiquidityProvider } from './LiquidityProvider/LiquidityProvider';
export { default as TraderPools } from './TraderPools/TraderPools';
export { default as Portfolio } from './Portfolio/Portfolio';
export { default as FixedBorrower } from './FixedBorrower/FixedBorrower';
export { default as TradingLeague } from './TradingLeague/TradingLeague';
export { default as Profile } from './Profile/Profile';
export { default as ProfileV1 } from './ProfileV1/Profile';
export { default as Ecosystem } from './Ecosystem/Ecosystem';
export { default as EcosystemV1 } from './EcosystemV1/Ecosystem';
