import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import {
  AvailableAmountForMarginAccount,
  PortfolioMarginAccount,
  PortfolioPosition,
  PortfolioSummary,
} from './thunks';
export type PositionsFilterId = 'active' | 'matured' | 'settled';

export type SliceState = {
  positionsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  createMarginAccountLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  createMarginAccountError: string;
  createMarginAccountDialogState: 'opened' | 'closed';
  positions: PortfolioPosition[];
  portfolioSummaryLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  portfolioSummary: PortfolioSummary | null;
  sortingDirection: PositionSorting;
  marginAccountsPositions: Record<
    PortfolioMarginAccount['id'],
    {
      status: 'idle' | 'pending' | 'succeeded' | 'failed';
      positions: PortfolioPosition[];
    }
  >;
  marginAccountsSortingDirection: MarginAccountsSorting;
  marginAccounts: PortfolioMarginAccount[];
  marginAccountsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  totalMarginAccounts: number;
  // 0-based, see MARGIN_ACCOUNTS_INITIAL_PAGE
  page: number;
  // margin account - withdraw flow
  marginAccountWithdrawMarginFlow: {
    // margin accounts for the selector
    marginAccounts: PortfolioMarginAccount[];
    marginAccountsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
    // available amounts for the selector
    availableAmounts: AvailableAmountForMarginAccount[];
    availableAmountsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
    step: 'closed' | 'opened' | 'withdrawing' | 'withdraw-success' | 'withdraw-error';
    selectedMarginAccount: null | PortfolioMarginAccount;
    error: string | null;
    txHash: string | null;
    simulation: {
      status: 'idle' | 'pending' | 'succeeded' | 'failed';
      value: null | {
        gasFeeUSD: number;
        marginRatioPercentage: PortfolioMarginAccount['marginRatioPercentage'];
        marginRatioHealth: PortfolioMarginAccount['marginRatioHealth'];
      };
    };
    userInput: {
      amount: number;
      maxAmount: AvailableAmountForMarginAccount['value'];
      maxAmountUSD: AvailableAmountForMarginAccount['valueUSD'];
      token: undefined | AvailableAmountForMarginAccount['token'];
    };
  };
};

export type PositionUI = {
  id: string;
  creationTimestampInMS: number;
  routeAmmId: string;
  routePositionId: string;
  routePoolId: string;
  isBorrowing: boolean;
  isV2: boolean;
  type: 'LP' | 'Variable' | 'Fixed';
  chainId: SupportedChainId;
  market: 'Aave V2' | 'Aave V3' | 'Compound' | 'Lido' | 'Rocket' | 'GMX:GLP' | 'SOFR';
  token?: 'eth' | 'usdc' | 'usdt' | 'dai';
  name: string;
  notionalUSD: number;
  notionalUSDCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
  marginUSD: number;
  marginUSDCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
  maturityFormatted: string;
  maturityEndTimestampInMS: number;
  maturityStartTimestampInMS: number;
  status: {
    health: 'healthy' | 'danger' | 'warning';
    variant: 'matured' | 'settled' | 'active';
    currentFixed: number;
    receiving: number;
    paying: number;
    fixLow: number;
    fixHigh: number;
  };
  unrealizedPNLUSD: number;
  unrealizedPNLUSDCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
  realizedPNLTotalUSD: number;
  realizedPNLTotalUSDCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
  realizedPNLFeesUSD: number;
  realizedPNLFeesUSDCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
  realizedPNLCashflowUSD: number;
  realizedPNLCashflowUSDCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
};

export type MarginAccountUI = {
  id: string;
  chainId: SupportedChainId;
  name: string;
  balanceCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
  positionsCount: string;
  marginRatioPercentage: number;
  marginRatioHealth: 'danger' | 'warning' | 'healthy';
};

export type AvailableAmountsUI = {
  token: AvailableAmountForMarginAccount['token'];
  value: AvailableAmountForMarginAccount['value'];
  valueUSD: AvailableAmountForMarginAccount['valueUSD'];
  valueSuffix: string;
  valueFormatted: string;
};

export type PositionSortId =
  | 'name'
  | 'notional'
  | 'margin'
  | 'maturity'
  | 'status'
  | 'unrealizedPNL'
  | 'realizedPNL';
export type MarginAccountSortId = 'balance' | 'marginRatio' | 'positionsLength';
export type SortDirection = 'noSort' | 'ascending' | 'descending';
export type PositionSorting = Record<PositionSortId, SortDirection>;
export type MarginAccountsSorting = Record<MarginAccountSortId, SortDirection>;
export type PositionsSummaryFormatted = {
  maturedPositionsLength: string;
  settledPositionsLength: string;
  activePositionsLength: string;
  positionsLength: string;
  healthyPositionsLength: string;
  warningPositionsLength: string;
  dangerPositionsLength: string;
  totalPortfolioValueUSDFormatted: string;
  totalPortfolioMarginValueUSDFormatted: string;
  totalPortfolioRealizedPNLValueUSDFormatted: string;
  totalPortfolioUnrealizedPNLValueUSDFormatted: string;
  totalPortfolioNotionalValueUSDCompactFormatted: {
    compactNumber: string;
    compactSuffix: string;
  };
  filterOptions: {
    id: PositionsFilterId;
    label: string;
    attentionPrefixText?: string;
  }[];
};
export type PortfolioSummaryFormatted = {
  healthyPositionsLength: string;
  warningPositionsLength: string;
  dangerPositionsLength: string;
  totalPortfolioValueUSDFormatted: string;
  totalPortfolioMarginValueUSDFormatted: string;
  totalPortfolioRealizedPNLValueUSDFormatted: string;
  totalPortfolioUnrealizedPNLValueUSDFormatted: string;
  totalPortfolioNotionalValueUSDCompactFormatted: {
    compactNumber: string;
    compactSuffix: string;
  };
  totalPortfolioCollateralUSDCompactFormatted: {
    compactNumber: string;
    compactSuffix: string;
  };
  distributions: PortfolioSummary['distributions'];
};
