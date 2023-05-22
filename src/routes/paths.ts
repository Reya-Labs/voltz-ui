export const routes = {
  PORTFOLIO: 'portfolio',
  POOLS: 'pools',
  WELCOME: 'welcome',
  TRADING_LEAGUE: 'trading-league',
  PROFILE: 'profile',
  VOYAGE: 'voyage',
  LP_OPTIMISERS: 'lp-optimisers',
  LP_OPTIMISERS_DEPOSIT_FORM: 'lp-optimisers/:actions/:vaultId',
  LP_OPTIMISERS_WITHDRAW_ROLLOVER_FORM: 'lp-optimisers/:actions/:vaultId/:vaultIndex',
  // new trader experience
  TRADER_SWAP_FORM: 'trader/swap/:ammId/:poolId',
  TRADER_ROLLOVER_SWAP_FORM: 'trader/rollover/:ammId/:positionId/:poolId',
  LP_FORM: 'lp/liquidity/:ammId/:poolId?',
  LP_ROLLOVER_FORM: 'lp/rollover/:ammId/:positionId/:poolId',
  // old route for lp-optimisers, redirects to lp-optimisers
  DEPRECATED_PRODUCTS: 'products',
  DEPRECATED_LP_PORTFOLIO: 'lp-positions',
  // todo: remove once we launch portfolio fully
  DEPRECATED_LP_PORTFOLIO_2: 'lp-portfolio',
  DEPRECATED_TRADER_POOLS: 'trader-pools',
  DEPRECATED_LP_POOLS: 'lp-pools',
};
