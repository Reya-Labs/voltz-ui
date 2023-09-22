import { isMarginAccountsLive } from '../../../utilities/is-margin-accounts-live';
import { routes } from '../../paths';
import {
  DEPRECATED_LP_POOLS,
  DEPRECATED_LP_PORTFOLIO,
  DEPRECATED_LP_PORTFOLIO_2,
  DEPRECATED_PORTFOLIO,
  DEPRECATED_PRODUCTS,
  DEPRECATED_TRADER_POOLS,
  WELCOME,
} from './constants';
import { SliceState } from './types';

const redirects = [
  {
    path: DEPRECATED_PRODUCTS,
    redirectsTo: routes.LP_OPTIMISERS,
  },
  {
    path: DEPRECATED_LP_PORTFOLIO,
    redirectsTo: routes.PORTFOLIO_POSITIONS,
  },
  {
    path: DEPRECATED_LP_PORTFOLIO_2,
    redirectsTo: routes.PORTFOLIO_POSITIONS,
  },
  {
    path: DEPRECATED_TRADER_POOLS,
    redirectsTo: routes.POOLS,
  },
  {
    path: DEPRECATED_LP_POOLS,
    redirectsTo: routes.POOLS,
  },
  {
    path: DEPRECATED_PORTFOLIO,
    redirectsTo: routes.PORTFOLIO_POSITIONS,
  },
  {
    path: WELCOME,
    redirectsTo: routes.POOLS,
  },
];

if (isMarginAccountsLive()) {
  redirects.push({
    path: routes.PORTFOLIO_POSITIONS,
    redirectsTo: routes.PORTFOLIO_MARGIN_ACCOUNTS_OVERVIEW,
  });
}

export const initialState: SliceState = {
  redirects,
};
