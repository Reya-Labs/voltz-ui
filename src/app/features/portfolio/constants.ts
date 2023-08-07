import {
  MarginAccountSortId,
  MarginAccountsSorting,
  PortfolioSummaryFormatted,
  PositionSortId,
  PositionSorting,
  PositionsSummaryFormatted,
} from './types';

export const resetPositionsSortingDirection: PositionSorting = {
  maturity: 'noSort',
  realizedPNL: 'noSort',
  status: 'noSort',
  unrealizedPNL: 'noSort',
  margin: 'noSort',
  notional: 'noSort',
  name: 'noSort',
};

export const resetMarginAccountsSortingDirection: MarginAccountsSorting = {
  balance: 'noSort',
  marginRatio: 'noSort',
  positionsLength: 'noSort',
};

export const initialPositionsSortingDirection: PositionSorting = {
  ...resetPositionsSortingDirection,
};

export const initialMarginAccountsSortingDirection: MarginAccountsSorting = {
  ...resetMarginAccountsSortingDirection,
};

export const POSITIONS_SORT_CONFIG: Record<
  PositionSortId,
  {
    text: string;
    subtext?: string;
    disabled: boolean;
  }
> = {
  realizedPNL: {
    text: 'Realized PnL',
    disabled: true,
  },
  status: {
    text: 'Status',
    disabled: true,
  },
  unrealizedPNL: {
    text: 'Unrealized PNL',
    disabled: true,
  },
  name: {
    text: 'Side - Pool',
    disabled: true,
  },
  margin: {
    text: 'Margin',
    disabled: false,
  },
  notional: {
    text: 'Notional',
    disabled: false,
  },
  maturity: {
    text: 'Maturity',
    disabled: true,
  },
};

export const MARGIN_ACCOUNTS_SORT_CONFIG: Record<
  MarginAccountSortId,
  {
    text: string;
  }
> = {
  marginRatio: { text: 'Margin Ratio' },
  positionsLength: { text: '# Positions' },
  balance: { text: 'Balance' },
};

export const defaultPositionsSummaryFormatted: PositionsSummaryFormatted = {
  positionsLength: '--',
  activePositionsLength: '--',
  settledPositionsLength: '--',
  maturedPositionsLength: '--',
  healthyPositionsLength: '--',
  warningPositionsLength: '--',
  dangerPositionsLength: '--',
  totalPortfolioValueUSDFormatted: '--',
  totalPortfolioMarginValueUSDFormatted: '--',
  totalPortfolioRealizedPNLValueUSDFormatted: '--',
  totalPortfolioUnrealizedPNLValueUSDFormatted: '--',
  totalPortfolioNotionalValueUSDCompactFormatted: {
    compactNumber: '--',
    compactSuffix: '',
  },
  filterOptions: [
    {
      id: 'active',
      label: 'Active',
    },
    {
      id: 'matured',
      label: 'To settle',
    },
    {
      id: 'settled',
      label: 'Settled',
    },
  ],
};

export const defaultPortfolioSummaryFormatted: PortfolioSummaryFormatted = {
  healthyPositionsLength: '--',
  warningPositionsLength: '--',
  dangerPositionsLength: '--',
  totalPortfolioValueUSDFormatted: '--',
  totalPortfolioMarginValueUSDFormatted: '--',
  totalPortfolioRealizedPNLValueUSDFormatted: '--',
  totalPortfolioUnrealizedPNLValueUSDFormatted: '--',
  totalPortfolioNotionalValueUSDCompactFormatted: {
    compactNumber: '--',
    compactSuffix: '',
  },
  totalPortfolioCollateralUSDCompactFormatted: {
    compactNumber: '--',
    compactSuffix: '',
  },
  distributions: [],
};

export const MARGIN_ACCOUNTS_PER_PAGE = 8;
