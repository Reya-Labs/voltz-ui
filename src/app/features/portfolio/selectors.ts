import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { isOnlyV2PoolsPositions } from '../../../utilities/is-only-v2-pools-positions';
import { compactFormat, compactFormatToParts } from '../../../utilities/number';
import { RootState } from '../../store';
import { formFormatNumber } from '../forms/common';
import {
  defaultMarginAccountSummaryFormatted,
  defaultPortfolioSummaryFormatted,
  defaultPositionsSummaryFormatted,
  initialPositionsSortingDirection,
  MARGIN_ACCOUNT_POSITIONS_IN_OVERVIEW_COUNT,
  MARGIN_ACCOUNTS_SORT_CONFIG,
  POSITIONS_SORT_CONFIG,
} from './constants';
import {
  getPositionsSummary,
  mapAvailableAmountMarginAccountDepositToAvailableAmountsUI,
  mapAvailableAmountMarginAccountWithdrawToAvailableAmountsUI,
  mapMarginAccountToMarginAccountUI,
  mapPortfolioPositionToPortfolioUI,
  sortPositions,
} from './helpers';
import { PortfolioMarginAccount } from './thunks';
import {
  MarginAccountSortId,
  MarginAccountUI,
  PortfolioSummaryFormatted,
  PositionSortId,
  PositionsSummaryFormatted,
  PositionUI,
  SortDirection,
} from './types';

export const selectPositions = (state: RootState): PositionUI[] => {
  const portfolioPositions = state.portfolio.positions;
  const appliedSortingDirection = state.portfolio.sortingDirection;
  if (!appliedSortingDirection) {
    return [];
  }

  const pools: PositionUI[] = portfolioPositions
    .filter((p) => (isOnlyV2PoolsPositions() ? p.pool.isV2 : true))
    .map(mapPortfolioPositionToPortfolioUI);

  return sortPositions(pools, {
    marginSortingDirection: appliedSortingDirection['margin'],
    notionalSortingDirection: appliedSortingDirection['notional'],
    statusSortingDirection: appliedSortingDirection['status'],
    nameSortingDirection: appliedSortingDirection['name'],
    maturitySortingDirection: appliedSortingDirection['maturity'],
    unrealizedPNLSortingDirection: appliedSortingDirection['unrealizedPNL'],
    realizedPNLSortingDirection: appliedSortingDirection['realizedPNL'],
  });
};

export const selectPositionsLoading = (state: RootState): boolean => {
  const loadedState = selectPositionsLoadedState(state);
  return loadedState === 'idle' || loadedState === 'pending';
};

export const selectPositionsSummary = (state: RootState): PositionsSummaryFormatted => {
  if (selectPositionsLoading(state)) {
    return defaultPositionsSummaryFormatted;
  }

  const positions = selectPositions(state);
  const {
    maturedPositionsLength,
    activePositionsLength,
    settledPositionsLength,
    healthyPositionsLength,
    dangerPositionsLength,
    warningPositionsLength,
    totalPortfolioMarginValueUSD,
    totalPortfolioRealizedPNLValueUSD,
    totalPortfolioNotionalValueUSD,
    totalPortfolioUnrealizedPNLValueUSD,
  } = getPositionsSummary(positions);

  return {
    positionsLength: positions.length.toString(),
    activePositionsLength: activePositionsLength.toString(),
    settledPositionsLength: settledPositionsLength.toString(),
    maturedPositionsLength: maturedPositionsLength.toString(),
    healthyPositionsLength: healthyPositionsLength.toString(),
    dangerPositionsLength: dangerPositionsLength.toString(),
    warningPositionsLength: warningPositionsLength.toString(),
    totalPortfolioMarginValueUSDFormatted: formFormatNumber(totalPortfolioMarginValueUSD),
    totalPortfolioNotionalValueUSDCompactFormatted: compactFormatToParts(
      totalPortfolioNotionalValueUSD,
    ),
    totalPortfolioRealizedPNLValueUSDFormatted: formFormatNumber(totalPortfolioRealizedPNLValueUSD),
    totalPortfolioUnrealizedPNLValueUSDFormatted: formFormatNumber(
      totalPortfolioUnrealizedPNLValueUSD,
    ),
    totalPortfolioValueUSDFormatted: formFormatNumber(
      totalPortfolioMarginValueUSD +
        totalPortfolioUnrealizedPNLValueUSD +
        totalPortfolioRealizedPNLValueUSD,
    ),
    filterOptions: [
      {
        id: 'active',
        label: 'Active',
        attentionPrefixText: activePositionsLength.toString(),
      },
      {
        id: 'matured',
        label: 'To settle',
        attentionPrefixText: maturedPositionsLength.toString(),
      },
      {
        id: 'settled',
        label: 'Settled',
        attentionPrefixText: settledPositionsLength.toString(),
      },
    ],
  };
};

export const selectPositionsSortOptions = (
  state: RootState,
): {
  id: PositionSortId;
  text: string;
  subtext?: string;
  direction: SortDirection;
  disabled: boolean;
}[] => {
  const sortingDirection = state.portfolio.sortingDirection;
  return Object.keys(sortingDirection).map((sortKey) => ({
    id: sortKey as PositionSortId,
    text: POSITIONS_SORT_CONFIG[sortKey as PositionSortId].text,
    subtext: POSITIONS_SORT_CONFIG[sortKey as PositionSortId].subtext,
    direction: sortingDirection[sortKey as PositionSortId],
    disabled: POSITIONS_SORT_CONFIG[sortKey as PositionSortId].disabled,
  }));
};

export const selectMarginAccountPositionsSortOptions =
  (id?: PortfolioMarginAccount['id']) =>
  (
    state: RootState,
  ): {
    id: PositionSortId;
    text: string;
    subtext?: string;
    direction: SortDirection;
    disabled: boolean;
  }[] => {
    const sortingDirection =
      (id
        ? state.portfolio.marginAccountPositionsSortingDirection[id]
        : initialPositionsSortingDirection) || initialPositionsSortingDirection;
    return Object.keys(sortingDirection).map((sortKey) => ({
      id: sortKey as PositionSortId,
      text: POSITIONS_SORT_CONFIG[sortKey as PositionSortId].text,
      subtext: POSITIONS_SORT_CONFIG[sortKey as PositionSortId].subtext,
      direction: sortingDirection[sortKey as PositionSortId],
      disabled: POSITIONS_SORT_CONFIG[sortKey as PositionSortId].disabled,
    }));
  };

export const selectMarginAccountsSortOptions = (
  state: RootState,
): {
  id: MarginAccountSortId;
  label: string;
  direction: SortDirection;
}[] => {
  const sortingDirection = state.portfolio.marginAccountsSortingDirection;
  return Object.keys(sortingDirection).map((sortKey) => ({
    id: sortKey as MarginAccountSortId,
    label: MARGIN_ACCOUNTS_SORT_CONFIG[sortKey as MarginAccountSortId].text,
    direction: sortingDirection[sortKey as MarginAccountSortId],
  }));
};

export const selectPositionsLoadedState = (state: RootState) => {
  return state.portfolio.positionsLoadedState;
};

export const selectPortfolioSummaryLoadedState = (state: RootState) => {
  return state.portfolio.portfolioSummaryLoadedState;
};

export const selectPortfolioSummaryLoading = (state: RootState): boolean => {
  const loadedState = selectPortfolioSummaryLoadedState(state);
  return loadedState === 'idle' || loadedState === 'pending';
};

export const selectPortfolioSummary = (state: RootState) => {
  return state.portfolio.portfolioSummary;
};

export const selectPortfolioSummaryFormatted = (state: RootState): PortfolioSummaryFormatted => {
  const summary = selectPortfolioSummary(state);
  if (summary === null || selectPortfolioSummaryLoading(state)) {
    return defaultPortfolioSummaryFormatted;
  }
  const {
    healthyPositionsLength,
    warningPositionsLength,
    dangerPositionsLength,
    totalPortfolioCollateralValueUSD,
    totalPortfolioRealizedPNLValueUSD,
    totalPortfolioMarginValueUSD,
    totalPortfolioNotionalValueUSD,
    totalPortfolioUnrealizedPNLValueUSD,
    distributions,
  } = summary;
  return {
    healthyPositionsLength: healthyPositionsLength.toString(),
    dangerPositionsLength: dangerPositionsLength.toString(),
    warningPositionsLength: warningPositionsLength.toString(),
    totalPortfolioMarginValueUSDFormatted: formFormatNumber(totalPortfolioMarginValueUSD),
    totalPortfolioNotionalValueUSDCompactFormatted: compactFormatToParts(
      totalPortfolioNotionalValueUSD,
    ),
    totalPortfolioRealizedPNLValueUSDFormatted: formFormatNumber(totalPortfolioRealizedPNLValueUSD),
    totalPortfolioUnrealizedPNLValueUSDFormatted: formFormatNumber(
      totalPortfolioUnrealizedPNLValueUSD,
    ),
    totalPortfolioValueUSDFormatted: formFormatNumber(
      totalPortfolioMarginValueUSD +
        totalPortfolioUnrealizedPNLValueUSD +
        totalPortfolioRealizedPNLValueUSD,
    ),
    totalPortfolioCollateralUSDCompactFormatted: compactFormatToParts(
      totalPortfolioCollateralValueUSD,
    ),
    distributions: distributions.slice(),
  };
};

export const selectMarginAccountsLoadedState = (state: RootState) => {
  return state.portfolio.marginAccountsLoadedState;
};

export const selectMarginAccountsLoading = (state: RootState): boolean => {
  const loadedState = selectMarginAccountsLoadedState(state);
  return loadedState === 'idle' || loadedState === 'pending';
};

export const selectTotalMarginAccountsFormatted = (state: RootState): string => {
  const isLoading = selectMarginAccountsLoading(state);
  return isLoading ? '--' : state.portfolio.totalMarginAccounts.toString();
};

export const selectTotalMarginAccounts = (state: RootState): number => {
  return state.portfolio.totalMarginAccounts;
};

export const selectMarginAccountsPage = (state: RootState): number => {
  return state.portfolio.page;
};

export const selectMarginAccounts = (state: RootState): MarginAccountUI[] => {
  const isLoading = selectMarginAccountsLoading(state);
  return isLoading ? [] : state.portfolio.marginAccounts.map(mapMarginAccountToMarginAccountUI);
};

export const selectMarginAccountPositionsLoadedState =
  (id: PortfolioMarginAccount['id']) => (state: RootState) => {
    const marginAccountsPositions = state.portfolio.marginAccountsPositions[id];
    if (!marginAccountsPositions) {
      return 'idle';
    }
    return marginAccountsPositions.status;
  };

export const selectMarginAccountPositionsLoading =
  (id?: PortfolioMarginAccount['id']) =>
  (state: RootState): boolean => {
    if (!id) {
      return true;
    }
    const loadedState = selectMarginAccountPositionsLoadedState(id)(state);
    return loadedState === 'idle' || loadedState === 'pending';
  };

export const selectMarginAccountPositions =
  (id?: PortfolioMarginAccount['id']) => (state: RootState) => {
    if (!id) {
      return [];
    }
    const marginAccountsPositions = state.portfolio.marginAccountsPositions[id];
    if (!marginAccountsPositions) {
      return [];
    }

    const appliedSortingDirection = state.portfolio.marginAccountPositionsSortingDirection[id] || {
      ...initialPositionsSortingDirection,
    };
    const positions: PositionUI[] = marginAccountsPositions.positions.map(
      mapPortfolioPositionToPortfolioUI,
    );

    return sortPositions(positions, {
      marginSortingDirection: appliedSortingDirection['margin'],
      notionalSortingDirection: appliedSortingDirection['notional'],
      statusSortingDirection: appliedSortingDirection['status'],
      nameSortingDirection: appliedSortingDirection['name'],
      maturitySortingDirection: appliedSortingDirection['maturity'],
      unrealizedPNLSortingDirection: appliedSortingDirection['unrealizedPNL'],
      realizedPNLSortingDirection: appliedSortingDirection['realizedPNL'],
    });
  };

export const selectCreateMarginAccountLoadedState = (state: RootState) => {
  return state.portfolio.createMarginAccountLoadedState;
};

export const selectCreateMarginAccountError = (state: RootState) => {
  return state.portfolio.createMarginAccountError;
};

export const selectCreateMarginAccountDialogState = (state: RootState) => {
  return state.portfolio.createMarginAccountDialogState;
};

// Withdraw flow
export const selectMarginAccountWithdrawFlowStep = (state: RootState) => {
  return state.portfolio.marginAccountWithdrawMarginFlow.step;
};

export const selectMarginAccountWithdrawFlowError = (state: RootState) => {
  return state.portfolio.marginAccountWithdrawMarginFlow.error;
};

export const selectMarginAccountWithdrawFlowValidationError = (state: RootState) => {
  const userInput = state.portfolio.marginAccountWithdrawMarginFlow.userInput;
  if (userInput.amount > userInput.maxAmount) {
    return 'You cannot withdraw more than allowed maximum amount.';
  }
  return '';
};

export const selectMarginAccountWithdrawFlowCTADisabled = (state: RootState) => {
  const validationError = selectMarginAccountWithdrawFlowValidationError(state);
  const loading = selectMarginAccountWithdrawFlowStep(state) === 'withdrawing';
  const selectedMarginAccountId =
    selectMarginAccountWithdrawFlowSelectedMarginAccountFormatted(state).id;

  return Boolean(validationError) || Boolean(loading) || !Boolean(selectedMarginAccountId);
};

export const selectMarginAccountWithdrawFlowSimulationStatus = (state: RootState) => {
  return state.portfolio.marginAccountWithdrawMarginFlow.simulation.status;
};

export const selectMarginAccountWithdrawFlowSimulationIsLoading = (state: RootState) => {
  const status = selectMarginAccountWithdrawFlowSimulationStatus(state);
  return status === 'pending' || status === 'idle';
};

export const selectMarginAccountWithdrawFlowSimulationValueFormatted = (state: RootState) => {
  const simulationValue = state.portfolio.marginAccountWithdrawMarginFlow.simulation.value;
  if (selectMarginAccountWithdrawFlowSimulationIsLoading(state) || simulationValue === null) {
    return {
      gasFeeUSDFormatted: {
        compactNumber: '--',
        compactSuffix: '',
      },
      marginRatioPercentage: '--',
      marginRatioHealth: '--',
    };
  }

  return {
    gasFeeUSDFormatted: compactFormatToParts(simulationValue.gasFeeUSD),
    marginRatioPercentage: simulationValue.marginRatioPercentage,
    marginRatioHealth: simulationValue.marginRatioHealth,
  };
};

export const selectMarginAccountWithdrawFlowSelectedMarginAccountFormatted = (state: RootState) => {
  const selectedMarginAccount =
    state.portfolio.marginAccountWithdrawMarginFlow.selectedMarginAccount;
  if (selectedMarginAccount === null) {
    return {
      id: '',
      name: '',
      marginRatioPercentage: '--',
      marginRatioHealth: '--',
      balanceCompactFormat: {
        compactNumber: '--',
        compactSuffix: '',
      },
    };
  }

  return {
    id: selectedMarginAccount.id,
    name: selectedMarginAccount.name,
    marginRatioPercentage: selectedMarginAccount.marginRatioPercentage,
    marginRatioHealth: selectedMarginAccount.marginRatioHealth,
    balanceCompactFormat: compactFormatToParts(selectedMarginAccount.balance),
  };
};

export const selectMarginAccountWithdrawFlowUserInputFormatted = (state: RootState) => {
  const userInput = state.portfolio.marginAccountWithdrawMarginFlow.userInput;

  return {
    amount: userInput.amount,
    amountFormatted: compactFormatToParts(userInput.amount),
    maxAmount: userInput.maxAmount,
    maxAmountFormatted: compactFormat(userInput.maxAmount),
    maxAmountUSDFormatted: compactFormat(userInput.maxAmountUSD),
    token: userInput.token,
  };
};

export const selectMarginAccountWithdrawFlowMarginAccountsLoadedState = (state: RootState) => {
  return state.portfolio.marginAccountWithdrawMarginFlow.marginAccountsLoadedState;
};

export const selectMarginAccountWithdrawFlowMarginAccountsLoading = (state: RootState): boolean => {
  const loadedState = selectMarginAccountWithdrawFlowMarginAccountsLoadedState(state);
  return loadedState === 'idle' || loadedState === 'pending';
};

export const selectMarginAccountWithdrawFlowMarginAccounts = (state: RootState) => {
  const isLoading = selectMarginAccountsLoading(state);
  return isLoading
    ? []
    : state.portfolio.marginAccountWithdrawMarginFlow.marginAccounts.map(
        mapMarginAccountToMarginAccountUI,
      );
};

export const selectMarginAccountWithdrawFlowAvailableAmountsLoadedState = (state: RootState) => {
  return state.portfolio.marginAccountWithdrawMarginFlow.availableAmountsLoadedState;
};

export const selectMarginAccountWithdrawFlowAvailableAmountsLoading = (
  state: RootState,
): boolean => {
  const loadedState = selectMarginAccountWithdrawFlowAvailableAmountsLoadedState(state);
  return loadedState === 'idle' || loadedState === 'pending';
};

export const selectMarginAccountWithdrawFlowAvailableAmounts = (state: RootState) => {
  const isLoading = selectMarginAccountWithdrawFlowAvailableAmountsLoading(state);
  return isLoading
    ? []
    : state.portfolio.marginAccountWithdrawMarginFlow.availableAmounts.map(
        mapAvailableAmountMarginAccountWithdrawToAvailableAmountsUI,
      );
};

export const selectMarginAccountWithdrawFlowEtherscanLink = (state: RootState) => {
  return getViewOnEtherScanLink(
    state.network.chainId,
    state.portfolio.marginAccountWithdrawMarginFlow.txHash || '',
  );
};
// Deposit flow
export const selectMarginAccountDepositFlowStep = (state: RootState) => {
  return state.portfolio.marginAccountDepositMarginFlow.step;
};

export const selectMarginAccountDepositFlowError = (state: RootState) => {
  return state.portfolio.marginAccountDepositMarginFlow.error;
};

export const selectMarginAccountDepositFlowShouldApproveToken = (state: RootState) => {
  const {
    userInput: { token, amount },
  } = state.portfolio.marginAccountDepositMarginFlow;
  const simulationValue = state.portfolio.marginAccountDepositMarginFlow.simulation.value;
  if (!token || amount <= 0 || simulationValue === null) {
    return false;
  }
  const value = selectMarginAccountDepositFlowWalletTokenAllowanceValue(state);
  const fee = simulationValue.gasFee;
  return amount + fee > value;
};

export const selectMarginAccountDepositFlowWalletTokenAllowanceHasError = (state: RootState) => {
  const {
    walletTokenAllowance: { status },
  } = state.portfolio.marginAccountDepositMarginFlow;
  return status === 'failed';
};

export const selectMarginAccountDepositFlowHasSimulationError = (state: RootState) => {
  return state.portfolio.marginAccountDepositMarginFlow.simulation.status === 'failed';
};

export const selectMarginAccountDepositFlowValidationError = (state: RootState) => {
  const {
    userInput: { amount, maxAmount },
  } = state.portfolio.marginAccountDepositMarginFlow;
  if (amount <= 0) {
    return {
      validationError: '',
      disableCTAButton: true,
    };
  }
  if (selectMarginAccountDepositFlowHasSimulationError(state)) {
    return {
      validationError: 'Gas fee calculation failed',
      disableCTAButton: false,
    };
  }
  if (selectMarginAccountDepositFlowWalletTokenAllowanceHasError(state)) {
    return {
      validationError: 'Something went wrong, retry to fetch approve information.',
      disableCTAButton: false,
    };
  }
  if (amount > maxAmount) {
    return {
      validationError: 'You cannot deposit more than allowed maximum amount.',
      disableCTAButton: true,
    };
  }
  if (selectMarginAccountDepositFlowShouldApproveToken(state)) {
    return {
      validationError: 'You cannot deposit the inputted amount. Approve first!',
      disableCTAButton: false,
    };
  }
  return {
    validationError: '',
    disableCTAButton: false,
  };
};

export const selectMarginAccountDepositFlowCTAText = (state: RootState) => {
  const step = selectMarginAccountDepositFlowStep(state);
  if (step === 'depositing') {
    return 'Waiting for deposit';
  }
  if (step === 'approvingToken') {
    return 'Approval pending...';
  }
  if (selectMarginAccountDepositFlowHasSimulationError(state)) {
    return 'Refresh Gas Calculation';
  }
  if (selectMarginAccountDepositFlowWalletTokenAllowanceHasError(state)) {
    return 'Retry';
  }
  if (step === 'approveTokenError') {
    return 'Try to approve again!';
  }
  if (selectMarginAccountDepositFlowShouldApproveToken(state)) {
    const { token } = state.portfolio.marginAccountDepositMarginFlow.userInput;
    return token ? `Approve ${(token as string).toUpperCase()} and deposit` : 'Approve and deposit';
  }
  return 'Deposit Margin';
};

export const selectMarginAccountDepositFlowWalletTokenAllowanceLoading = (state: RootState) => {
  const { status } = state.portfolio.marginAccountDepositMarginFlow.walletTokenAllowance;
  return status === 'idle' || status === 'pending';
};

export const selectMarginAccountDepositFlowWalletTokenAllowanceValue = (state: RootState) => {
  if (state.portfolio.marginAccountDepositMarginFlow.walletTokenAllowance.status === 'succeeded') {
    return state.portfolio.marginAccountDepositMarginFlow.walletTokenAllowance.value;
  }
  return 0;
};

export const selectMarginAccountDepositFlowCTADisabled = (state: RootState) => {
  const walletTokenAllowanceLoading =
    selectMarginAccountDepositFlowWalletTokenAllowanceLoading(state);
  const { disableCTAButton } = selectMarginAccountDepositFlowValidationError(state);
  const step = selectMarginAccountDepositFlowStep(state);
  const loading = walletTokenAllowanceLoading || step === 'depositing' || step === 'approvingToken';
  const selectedMarginAccountId =
    selectMarginAccountDepositFlowSelectedMarginAccountFormatted(state).id;
  return disableCTAButton || Boolean(loading) || !Boolean(selectedMarginAccountId);
};

export const selectMarginAccountDepositFlowSimulationStatus = (state: RootState) => {
  return state.portfolio.marginAccountDepositMarginFlow.simulation.status;
};

export const selectMarginAccountDepositFlowSimulationIsLoading = (state: RootState) => {
  const status = selectMarginAccountDepositFlowSimulationStatus(state);
  return status === 'pending' || status === 'idle';
};

export const selectMarginAccountDepositFlowSimulationValueFormatted = (state: RootState) => {
  const simulationValue = state.portfolio.marginAccountDepositMarginFlow.simulation.value;
  if (selectMarginAccountDepositFlowSimulationIsLoading(state) || simulationValue === null) {
    return {
      gasFeeUSDFormatted: {
        compactNumber: '--',
        compactSuffix: '',
      },
      marginRatioPercentage: '--',
      marginRatioHealth: '--',
    };
  }

  return {
    gasFeeUSDFormatted: compactFormatToParts(simulationValue.gasFeeUSD),
    marginRatioPercentage: simulationValue.marginRatioPercentage,
    marginRatioHealth: simulationValue.marginRatioHealth,
  };
};

export const selectMarginAccountDepositFlowSelectedMarginAccountFormatted = (state: RootState) => {
  const selectedMarginAccount =
    state.portfolio.marginAccountDepositMarginFlow.selectedMarginAccount;
  if (selectedMarginAccount === null) {
    return {
      id: '',
      name: '',
      marginRatioPercentage: '--',
      marginRatioHealth: '--',
      balanceCompactFormat: {
        compactNumber: '--',
        compactSuffix: '',
      },
    };
  }

  return {
    id: selectedMarginAccount.id,
    name: selectedMarginAccount.name,
    marginRatioPercentage: selectedMarginAccount.marginRatioPercentage,
    marginRatioHealth: selectedMarginAccount.marginRatioHealth,
    balanceCompactFormat: compactFormatToParts(selectedMarginAccount.balance),
  };
};

export const selectMarginAccountDepositFlowUserInputFormatted = (state: RootState) => {
  const userInput = state.portfolio.marginAccountDepositMarginFlow.userInput;

  return {
    amount: userInput.amount,
    amountFormatted: compactFormatToParts(userInput.amount),
    maxAmount: userInput.maxAmount,
    maxAmountFormatted: compactFormat(userInput.maxAmount),
    maxAmountUSDFormatted: compactFormat(userInput.maxAmountUSD),
    token: userInput.token,
  };
};

export const selectMarginAccountDepositFlowMarginAccountsLoadedState = (state: RootState) => {
  return state.portfolio.marginAccountDepositMarginFlow.marginAccountsLoadedState;
};

export const selectMarginAccountDepositFlowMarginAccountsLoading = (state: RootState): boolean => {
  const loadedState = selectMarginAccountDepositFlowMarginAccountsLoadedState(state);
  return loadedState === 'idle' || loadedState === 'pending';
};

export const selectMarginAccountDepositFlowMarginAccounts = (state: RootState) => {
  const isLoading = selectMarginAccountsLoading(state);
  return isLoading
    ? []
    : state.portfolio.marginAccountDepositMarginFlow.marginAccounts.map(
        mapMarginAccountToMarginAccountUI,
      );
};

export const selectMarginAccountDepositFlowAvailableAmountsLoadedState = (state: RootState) => {
  return state.portfolio.marginAccountDepositMarginFlow.availableAmountsLoadedState;
};

export const selectMarginAccountDepositFlowAvailableAmountsLoading = (
  state: RootState,
): boolean => {
  const loadedState = selectMarginAccountDepositFlowAvailableAmountsLoadedState(state);
  return loadedState === 'idle' || loadedState === 'pending';
};

export const selectMarginAccountDepositFlowAvailableAmounts = (state: RootState) => {
  const isLoading = selectMarginAccountDepositFlowAvailableAmountsLoading(state);
  return isLoading
    ? []
    : state.portfolio.marginAccountDepositMarginFlow.availableAmounts.map(
        mapAvailableAmountMarginAccountDepositToAvailableAmountsUI,
      );
};

export const selectMarginAccountDepositFlowEtherscanLink = (state: RootState) => {
  return getViewOnEtherScanLink(
    state.network.chainId,
    state.portfolio.marginAccountDepositMarginFlow.txHash || '',
  );
};

export const selectMarginAccountSummaryLoadedState =
  (id: PortfolioMarginAccount['id']) => (state: RootState) => {
    const marginAccountSummary = state.portfolio.marginAccountsSummary[id];
    if (!marginAccountSummary || !marginAccountSummary.value) {
      return 'idle';
    }
    return marginAccountSummary.status;
  };

export const selectMarginAccountSummaryLoading =
  (id: PortfolioMarginAccount['id']) =>
  (state: RootState): boolean => {
    const loadedState = selectMarginAccountSummaryLoadedState(id)(state);
    return loadedState === 'idle' || loadedState === 'pending';
  };

export const selectMarginAccountSummary =
  (id?: PortfolioMarginAccount['id']) => (state: RootState) => {
    if (!id) {
      return defaultMarginAccountSummaryFormatted;
    }
    const marginAccountSummary = state.portfolio.marginAccountsSummary[id];
    if (
      !marginAccountSummary ||
      !marginAccountSummary.value ||
      selectMarginAccountSummaryLoading(id)(state)
    ) {
      return defaultMarginAccountSummaryFormatted;
    }
    const {
      totalPositionsCount,
      totalPortfolioCollateralValueUSD,
      totalPortfolioRealizedPNLValueUSD,
      totalPortfolioMarginValueUSD,
      totalPortfolioNotionalValueUSD,
      totalPortfolioUnrealizedPNLValueUSD,
      marginRatioHealth,
      marginRatioPercentage,
      distributions,
      name,
      chainId,
    } = marginAccountSummary.value;
    return {
      name,
      chainId,
      positionsLength: totalPositionsCount.toString(),
      totalPortfolioMarginValueUSDFormatted: formFormatNumber(totalPortfolioMarginValueUSD),
      totalPortfolioNotionalValueUSDCompactFormatted: compactFormatToParts(
        totalPortfolioNotionalValueUSD,
      ),
      totalPortfolioRealizedPNLValueUSDFormatted: formFormatNumber(
        totalPortfolioRealizedPNLValueUSD,
      ),
      totalPortfolioUnrealizedPNLValueUSDFormatted: formFormatNumber(
        totalPortfolioUnrealizedPNLValueUSD,
      ),
      totalPortfolioValueUSDFormatted: formFormatNumber(
        totalPortfolioMarginValueUSD +
          totalPortfolioUnrealizedPNLValueUSD +
          totalPortfolioRealizedPNLValueUSD,
      ),
      totalPortfolioCollateralUSDCompactFormatted: compactFormatToParts(
        totalPortfolioCollateralValueUSD,
      ),
      marginRatioHealth,
      marginRatioPercentage,
      distributions: distributions.slice(),
    };
  };

export const selectMarginAccountPositionsSummary =
  (id?: PortfolioMarginAccount['id']) =>
  (state: RootState): PositionsSummaryFormatted => {
    if (!id || selectMarginAccountPositionsLoading(id)(state)) {
      return defaultPositionsSummaryFormatted;
    }

    const positions = selectMarginAccountPositions(id)(state);
    const {
      maturedPositionsLength,
      activePositionsLength,
      settledPositionsLength,
      healthyPositionsLength,
      dangerPositionsLength,
      warningPositionsLength,
      totalPortfolioMarginValueUSD,
      totalPortfolioRealizedPNLValueUSD,
      totalPortfolioNotionalValueUSD,
      totalPortfolioUnrealizedPNLValueUSD,
    } = getPositionsSummary(positions);

    return {
      positionsLength: positions.length.toString(),
      activePositionsLength: activePositionsLength.toString(),
      settledPositionsLength: settledPositionsLength.toString(),
      maturedPositionsLength: maturedPositionsLength.toString(),
      healthyPositionsLength: healthyPositionsLength.toString(),
      dangerPositionsLength: dangerPositionsLength.toString(),
      warningPositionsLength: warningPositionsLength.toString(),
      totalPortfolioMarginValueUSDFormatted: formFormatNumber(totalPortfolioMarginValueUSD),
      totalPortfolioNotionalValueUSDCompactFormatted: compactFormatToParts(
        totalPortfolioNotionalValueUSD,
      ),
      totalPortfolioRealizedPNLValueUSDFormatted: formFormatNumber(
        totalPortfolioRealizedPNLValueUSD,
      ),
      totalPortfolioUnrealizedPNLValueUSDFormatted: formFormatNumber(
        totalPortfolioUnrealizedPNLValueUSD,
      ),
      totalPortfolioValueUSDFormatted: formFormatNumber(
        totalPortfolioMarginValueUSD +
          totalPortfolioUnrealizedPNLValueUSD +
          totalPortfolioRealizedPNLValueUSD,
      ),
      filterOptions: [
        {
          id: 'active',
          label: 'Active',
          attentionPrefixText: activePositionsLength.toString(),
        },
        {
          id: 'matured',
          label: 'To settle',
          attentionPrefixText: maturedPositionsLength.toString(),
        },
        {
          id: 'settled',
          label: 'Settled',
          attentionPrefixText: settledPositionsLength.toString(),
        },
      ],
    };
  };

export const selectMarginAccountsForSelectionLoadedState = (state: RootState) => {
  return state.portfolio.marginAccountsForSelectionLoadedState;
};

export const selectMarginAccountsForSelectionLoading = (state: RootState): boolean => {
  const loadedState = selectMarginAccountsForSelectionLoadedState(state);
  return loadedState === 'idle' || loadedState === 'pending';
};

export const selectMarginAccountsForSelectionMarginAccounts = (state: RootState) => {
  const isLoading = selectMarginAccountsForSelectionLoading(state);
  return isLoading
    ? []
    : state.portfolio.marginAccountsForSelection.map(mapMarginAccountToMarginAccountUI);
};

export const selectMarginAccountPositionsForOverview =
  (id?: PortfolioMarginAccount['id']) => (state: RootState) => {
    if (!id) {
      return [];
    }
    const positions = selectMarginAccountPositions(id)(state);
    return positions.slice(0, MARGIN_ACCOUNT_POSITIONS_IN_OVERVIEW_COUNT);
  };
