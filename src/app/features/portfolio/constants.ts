import {
  PortfolioSummaryFormatted,
  PositionSortId,
  PositionSorting,
  PositionsSummaryFormatted,
} from './types';

export const resetSortingDirection: PositionSorting = {
  maturity: 'noSort',
  realizedPNL: 'noSort',
  status: 'noSort',
  unrealizedPNL: 'noSort',
  margin: 'noSort',
  notional: 'noSort',
  name: 'noSort',
};

export const initialSortingDirection: PositionSorting = {
  ...resetSortingDirection,
};

export const SORT_CONFIG: Record<
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
