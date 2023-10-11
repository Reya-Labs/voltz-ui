import { SupportedChainId } from '@voltz-protocol/v1-sdk';

import { CompactFormatParts } from '../../../utilities/number';
import {
  AvailableAmountForMarginAccountWithdraw,
  MarginAccountSummary,
  PortfolioMarginAccount,
  PortfolioPosition,
  PortfolioSummary,
  ReturnTypeSimulateWithdrawMargin,
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
  marginAccountPositionsSortingDirection: Record<PortfolioMarginAccount['id'], PositionSorting>;
  marginAccountsPositions: Record<
    PortfolioMarginAccount['id'],
    {
      status: 'idle' | 'pending' | 'succeeded' | 'failed';
      positions: PortfolioPosition[];
    }
  >;
  marginAccountsSummary: Record<
    PortfolioMarginAccount['id'],
    {
      status: 'idle' | 'pending' | 'succeeded' | 'failed';
      value: null | MarginAccountSummary;
    }
  >;
  marginAccountsSortingDirection: MarginAccountsSorting;
  marginAccounts: PortfolioMarginAccount[];
  marginAccountsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  marginAccountsForSelection: PortfolioMarginAccount[];
  marginAccountsForSelectionLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
  totalMarginAccounts: number;
  // 0-based, see MARGIN_ACCOUNTS_INITIAL_PAGE
  page: number;
  // margin account - withdraw flow
  marginAccountWithdrawMarginFlow: {
    // margin accounts for the selector
    marginAccounts: PortfolioMarginAccount[];
    marginAccountsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
    // available amounts for the selector
    availableAmounts: AvailableAmountForMarginAccountWithdraw[];
    availableAmountsLoadedState: 'idle' | 'pending' | 'succeeded' | 'failed';
    step: 'closed' | 'opened' | 'withdrawing' | 'withdraw-success' | 'withdraw-error';
    selectedMarginAccount: null | PortfolioMarginAccount;
    error: string | null;
    txHash: string | null;
    simulation: {
      status: 'idle' | 'pending' | 'succeeded' | 'failed';
      value: null | ReturnTypeSimulateWithdrawMargin;
    };
    userInput: {
      amount: number;
      maxAmount: AvailableAmountForMarginAccountWithdraw['value'];
      maxAmountUSD: AvailableAmountForMarginAccountWithdraw['valueUSD'];
      token: undefined | AvailableAmountForMarginAccountWithdraw['token'];
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
  token?: PortfolioPosition['pool']['underlyingToken']['name'];
  name: string;
  notionalUSD: number;
  notionalUSDCompactFormat: CompactFormatParts;
  marginUSD: number;
  marginUSDCompactFormat: CompactFormatParts;
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
  unrealizedPNLUSDCompactFormat: CompactFormatParts;
  realizedPNLTotalUSD: number;
  realizedPNLTotalUSDCompactFormat: CompactFormatParts;
  realizedPNLFeesUSD: number;
  realizedPNLFeesUSDCompactFormat: CompactFormatParts;
  realizedPNLCashflowUSD: number;
  realizedPNLCashflowUSDCompactFormat: CompactFormatParts;
};

export type MarginAccountUI = {
  id: string;
  chainId: SupportedChainId;
  name: string;
  balanceCompactFormatted: CompactFormatParts;
  balanceUSDCompactFormatted: CompactFormatParts;
  initialMarginPreTradeCompactFormatted: CompactFormatParts;
  positionsCount: string;
  marginRatioPercentage: number;
  marginRatioHealth: 'danger' | 'warning' | 'healthy';
};

export type AvailableAmountsUI = {
  token: AvailableAmountForMarginAccountWithdraw['token'];
  value: AvailableAmountForMarginAccountWithdraw['value'];
  valueUSD: AvailableAmountForMarginAccountWithdraw['valueUSD'];
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
  totalPortfolioNotionalValueUSDCompactFormatted: CompactFormatParts;
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
  totalPortfolioNotionalValueUSDCompactFormatted: CompactFormatParts;
  totalPortfolioCollateralUSDCompactFormatted: CompactFormatParts;
  distributions: PortfolioSummary['distributions'];
};

export type MarginAccountSummaryFormatted = {
  name: string;
  chainId: SupportedChainId | null;
  positionsLength: string;
  totalPortfolioValueUSDFormatted: string;
  totalPortfolioMarginValueUSDFormatted: string;
  totalPortfolioRealizedPNLValueUSDFormatted: string;
  totalPortfolioUnrealizedPNLValueUSDFormatted: string;
  totalPortfolioNotionalValueUSDCompactFormatted: CompactFormatParts;
  totalPortfolioCollateralUSDCompactFormatted: CompactFormatParts;
  marginRatioPercentage: number;
  marginRatioHealth: 'danger' | 'warning' | 'healthy';
  distributions: MarginAccountSummary['distributions'];
};
