export const routes = {
  LP_FARM: 'lp-positions',
  POOLS: 'lp-pools',
  PORTFOLIO: 'portfolio',
  SWAP: 'trader-pools',
  BORROW_POS: 'borrow-positions',
  ECOSYSTEM: 'ecosystem',
  TRM_POST: 'trm-post'
};

export { default as LiquidityProvider } from './LiquidityProvider/LiquidityProvider';
export { default as Trader } from './Trader/Trader';
export { default as FixedBorrower } from './FixedBorrower/FixedBorrower';
export { default as Ecosystem } from './Ecosystem/Ecosystem';
