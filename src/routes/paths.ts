export const routes = {
  LP_PORTFOLIO: 'lp-portfolio',
  LP_POOLS: 'lp-pools',
  TRADER_PORTFOLIO: 'portfolio',
  TRADER_POOLS: 'trader-pools',
  WELCOME: 'welcome',
  // todo: remove this route when we perform general cleanup
  BORROW_POS: 'borrow-positions',
  TRADING_LEAGUE: 'trading-league',
  PROFILE: 'profile',
  LP_OPTIMISERS: 'lp-optimisers',
  LP_OPTIMISERS_DEPOSIT_FORM: 'lp-optimisers/:actions/:vaultId',
  LP_OPTIMISERS_WITHDRAW_ROLLOVER_FORM: 'lp-optimisers/:actions/:vaultId/:vaultIndex',
  // old route for lp-optimisers, redirects to lp-optimisers
  DEPRECATED_PRODUCTS: 'products',
  DEPRECATED_LP_PORTFOLIO: 'lp-positions',
};
