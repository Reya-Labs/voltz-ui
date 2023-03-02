import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { formatNumber, roundIntegerNumber, stringToBigFloat } from '../../../utilities/number';
import { RootState } from '../../store';

// ------------ General Swap Form State Info ------------
export const selectSubmitButtonInfo = (state: RootState) => state.swapForm.submitButton;
export const selectSwapFormAMM = (state: RootState) => state.swapForm.amm;
export const selectSwapFormPosition = (state: RootState) => state.swapForm.position.value;
export const selectSwapFormPositionFetchingStatus = (state: RootState) =>
  state.swapForm.position.status;
export const selectWalletBalanceInfo = (state: RootState) => state.swapForm.walletBalance;
export const selectFixedRateInfo = (state: RootState) => state.swapForm.fixedRate;
export const selectVariableRateInfo = (state: RootState) => state.swapForm.variableRate;
export const selectPoolSwapInfo = (state: RootState) => state.swapForm.poolSwapInfo;

// ------------ Prospective Swap ------------
export const selectMode = (state: RootState) => state.swapForm.prospectiveSwap.mode;
export const selectNotionalAmount = (state: RootState) =>
  state.swapForm.prospectiveSwap.notionalAmount;
export const selectMarginAmount = (state: RootState) => state.swapForm.prospectiveSwap.marginAmount;
export const selectLeverage = (state: RootState) => state.swapForm.prospectiveSwap.leverage;
export const selectInfoPostSwap = (state: RootState) => state.swapForm.prospectiveSwap.infoPostSwap;
export const selectIsMarginRequiredError = (state: RootState) => {
  return (
    state.swapForm.prospectiveSwap.marginAmount.error !== null &&
    state.swapForm.prospectiveSwap.marginAmount.error !== 'WLT'
  );
};
export const selectIsWalletMarginError = (state: RootState) => {
  return state.swapForm.prospectiveSwap.marginAmount.error === 'WLT';
};

// ------------ Cashflow Calculator Selectors ------------
export const selectCashflowCalculatorStatus = (state: RootState) =>
  state.swapForm.cashflowCalculator.variableFactorStartNow.status;
export const selectPredictedApy = (state: RootState) =>
  state.swapForm.cashflowCalculator.predictedApy;
export const selectAdditionalCashflow = (state: RootState) =>
  state.swapForm.cashflowCalculator.additionalCashflow;
export const selectTotalCashflow = (state: RootState) =>
  state.swapForm.cashflowCalculator.totalCashflow;

// ------------ Swap Confirmation Flow Selectors ------------
export const selectSwapConfirmationFlowStep = (state: RootState) =>
  state.swapForm.swapConfirmationFlow.step;
export const selectSwapConfirmationFlowError = (state: RootState) =>
  state.swapForm.swapConfirmationFlow.error;
export const selectSwapConfirmationFlowEtherscanLink = (state: RootState) => {
  return state.swapForm.swapConfirmationFlow.txHash
    ? getViewOnEtherScanLink(state.network.chainId, state.swapForm.swapConfirmationFlow.txHash)
    : 'https://voltz.xyz';
};

// ------------ Variable Rate Delta ------------
export const selectVariableRate24hDelta = (state: RootState) => {
  return state.swapForm.variableRate24hAgo.status === 'success' &&
    state.swapForm.variableRate.status === 'success'
    ? stringToBigFloat(
        formatNumber(state.swapForm.variableRate.value - state.swapForm.variableRate24hAgo.value),
      )
    : undefined;
};

// ------------ Submit button text ------------
export const selectSubmitButtonText = (state: RootState) => {
  switch (state.swapForm.submitButton.state) {
    case 'swap':
      return 'Swap';
    case 'not-enough-balance':
      return 'Not enough balance';
    case 'approve':
      return `Approve ${
        state.swapForm.amm ? state.swapForm.amm.underlyingToken.name.toUpperCase() : ''
      }`;
    case 'approving':
      return `Approving...`;
    case 'connect-wallet':
      return 'Connect Your Wallet to Start Trading';
  }
};

// ------------ Leverage ------------
export const selectLeverageOptions = (state: RootState) => {
  const swapFormState = state.swapForm;

  let maxLeverage = '--';
  if (swapFormState.prospectiveSwap.infoPostSwap.status === 'idle') {
    maxLeverage = formatNumber(
      Math.floor(swapFormState.poolSwapInfo.maxLeverage[swapFormState.prospectiveSwap.mode]),
      0,
      0,
    );
  }
  if (
    !swapFormState.prospectiveSwap.notionalAmount.error &&
    swapFormState.prospectiveSwap.infoPostSwap.status === 'success'
  ) {
    if (swapFormState.prospectiveSwap.infoPostSwap.value.marginRequirement > 0) {
      maxLeverage = formatNumber(
        Math.floor(
          stringToBigFloat(swapFormState.prospectiveSwap.notionalAmount.value) /
            swapFormState.prospectiveSwap.infoPostSwap.value.marginRequirement,
        ),
        0,
        0,
      );
    } else {
      maxLeverage = formatNumber(
        Math.floor(swapFormState.poolSwapInfo.maxLeverage[swapFormState.prospectiveSwap.mode]),
        0,
        0,
      );
    }
  }

  let leverageOptions = [0, 0, 0];
  if (maxLeverage !== '--') {
    let maxLeverageOption = stringToBigFloat(maxLeverage);
    maxLeverageOption = roundIntegerNumber(
      maxLeverageOption,
      Math.max(
        0,
        Math.floor(maxLeverageOption.toString().length / 2) -
          1 +
          (maxLeverageOption.toString().length % 2),
      ),
    );
    leverageOptions = [
      Math.floor(maxLeverageOption / 4),
      Math.floor(maxLeverageOption / 2),
      Math.floor(maxLeverageOption),
    ];
  }

  return {
    maxLeverage,
    leverageOptions,
  };
};
