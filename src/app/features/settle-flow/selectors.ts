import { getViewOnEtherScanLink, Position } from '@voltz-protocol/v1-sdk';

import { formatTimestamp } from '../../../utilities/date';
import { isPortfolioNextEnabled } from '../../../utilities/isEnvVarProvided/is-portfolio-next-enabled';
import { formatNumber } from '../../../utilities/number';
import { RootState } from '../../store';
import { formCompactFormatToParts, formFormatNumber } from '../forms/common/utils';
import { PositionDetailsUI } from '../position-details';

export const selectSettlePosition = (state: RootState) => {
  if (isPortfolioNextEnabled()) {
    return state.settleFlow.positionDetails;
  }
  return state.settleFlow.position;
};
export const selectSettleVariant = (state: RootState) => {
  if (state.settleFlow.position) {
    return state.settleFlow.position.positionType === 3 ? 'lp' : 'trader';
  }
  if (state.settleFlow.positionDetails) {
    return state.settleFlow.positionDetails.type === 'LP' ? 'lp' : 'trader';
  }
  return null;
};
export const selectSettleError = (state: RootState) => state.settleFlow.error;
export const selectSettleStep = (state: RootState) => state.settleFlow.step;
export const selectConfirmationFlowEtherscanLink = (state: RootState) => {
  return getViewOnEtherScanLink(state.network.chainId, state.settleFlow.txHash || '');
};
export const selectSettleGasFee = (state: RootState) => {
  const infoPostSettlePosition = state.settleFlow.infoPostSettlePosition;
  if (infoPostSettlePosition.status !== 'success') {
    return '--';
  }
  return formatNumber(infoPostSettlePosition.value.gasFee.value, 2, 4);
};
export const selectSettleGasFeeToken = (state: RootState) => {
  const infoPostSettlePosition = state.settleFlow.infoPostSettlePosition;
  if (infoPostSettlePosition.status !== 'success') {
    return '--';
  }
  return infoPostSettlePosition.value.gasFee.token;
};

// todo: FB duplicate as in swap form
export const selectAMMMaturityFormatted = (state: RootState) => {
  if (isPortfolioNextEnabled()) {
    const aMM = state.settleFlow.positionDetails?.amm;
    if (!aMM) {
      return '';
    }
    return formatTimestamp(aMM.termEndTimestampInMS);
  }
  const aMM = state.settleFlow.position?.amm;
  if (!aMM) {
    return '';
  }
  return formatTimestamp(aMM.termEndTimestampInMS);
};

// todo: FB duplicate as in swap form
export const selectAMMTokenFormatted = (state: RootState) => {
  if (isPortfolioNextEnabled()) {
    const aMM = state.settleFlow.positionDetails?.amm;
    if (!aMM) {
      return '';
    }
    return ` ${aMM.underlyingToken.name.toUpperCase()}`;
  }
  const aMM = state.settleFlow.position?.amm;
  if (!aMM) {
    return '';
  }
  return ` ${aMM.underlyingToken.name.toUpperCase()}`;
};

export const selectFixedLower = (state: RootState) => {
  const position = selectSettlePosition(state);
  if (position === null) {
    return null;
  }
  if (isPortfolioNextEnabled()) {
    return formFormatNumber((position as PositionDetailsUI).fixLowPercentage);
  }

  return (position as Position).fixedRateLower.toNumber();
};

export const selectFixedUpper = (state: RootState) => {
  const position = selectSettlePosition(state);
  if (position === null) {
    return null;
  }
  if (isPortfolioNextEnabled()) {
    return formFormatNumber((position as PositionDetailsUI).fixHighPercentage);
  }

  return (position as Position).fixedRateUpper.toNumber();
};

export const selectCompactNotional = (state: RootState) => {
  const position = selectSettlePosition(state);
  if (position === null) {
    return {
      compactNotionalSuffix: '',
      compactNotionalNumber: '--',
    };
  }
  const notional = position.notional;

  const compactParts = formCompactFormatToParts(notional);
  return {
    compactNotionalSuffix: compactParts.compactSuffix,
    compactNotionalNumber: compactParts.compactNumber,
  };
};

export const selectCompactDepositedMargin = (state: RootState) => {
  const position = selectSettlePosition(state);
  if (position === null) {
    return {
      compactDepositedMarginSuffix: '',
      compactDepositedMarginNumber: '--',
    };
  }
  const feesPaid = isPortfolioNextEnabled()
    ? (position as PositionDetailsUI).realizedPNLFees
    : (position as Position).realizedPnLFromFeesPaid;
  const depositedMargin = position.margin - feesPaid;

  const compactParts = formCompactFormatToParts(depositedMargin);
  return {
    compactDepositedMarginSuffix: compactParts.compactSuffix,
    compactDepositedMarginNumber: compactParts.compactNumber,
  };
};

export const selectCompactNetBalance = (state: RootState) => {
  const position = selectSettlePosition(state);
  if (position === null) {
    return {
      compactNetBalanceSuffix: '',
      compactNetBalanceNumber: '--',
    };
  }
  const settlementCashflow = isPortfolioNextEnabled()
    ? (position as PositionDetailsUI).realizedPNLCashflow
    : (position as Position).settlementCashflow;
  const fees = isPortfolioNextEnabled()
    ? (position as PositionDetailsUI).realizedPNLFees
    : (position as Position).fees;

  const netBalance = position.margin + settlementCashflow + fees;

  const compactParts = formCompactFormatToParts(netBalance);
  return {
    compactNetBalanceSuffix: compactParts.compactSuffix,
    compactNetBalanceNumber: compactParts.compactNumber,
  };
};

export const selectCompactRealizedPnL = (state: RootState) => {
  const position = selectSettlePosition(state);
  if (position === null) {
    return {
      compactRealizedPnLSuffix: '',
      compactRealizedPnLTotal: '--',
      compactRealizedPnLFees: '--',
      compactRealizedPnLSwaps: '--',
    };
  }
  const settlementCashflow = isPortfolioNextEnabled()
    ? (position as PositionDetailsUI).realizedPNLCashflow
    : (position as Position).settlementCashflow;
  const feesPaid = isPortfolioNextEnabled()
    ? (position as PositionDetailsUI).realizedPNLFees
    : (position as Position).realizedPnLFromFeesPaid;
  const fees = isPortfolioNextEnabled() ? 0 : (position as Position).fees;

  const realizedPnL = settlementCashflow + fees + feesPaid;

  const compactPartsTotal = formCompactFormatToParts(realizedPnL);
  const compactPartsFees = formCompactFormatToParts(fees + feesPaid);
  const compactPartsSwaps = formCompactFormatToParts(settlementCashflow);
  return {
    compactRealizedPnLSuffix: compactPartsTotal.compactSuffix,
    compactRealizedPnLTotal: compactPartsTotal.compactNumber,
    compactRealizedPnLFees: `${compactPartsFees.compactNumber}${compactPartsFees.compactSuffix}`,
    compactRealizedPnLSwaps: `${compactPartsSwaps.compactNumber}${compactPartsFees.compactSuffix}`,
  };
};

export const selectAMMMarket = (state: RootState) => {
  if (isPortfolioNextEnabled()) {
    const aMM = state.settleFlow.positionDetails?.amm;
    if (!aMM) {
      return '';
    }
    return aMM.market;
  }
  const aMM = state.settleFlow.position?.amm;
  if (!aMM) {
    return '';
  }
  return aMM.market.name;
};

// todo: FB duplicate as in swap form
export const selectAMMToken = (state: RootState) => {
  if (isPortfolioNextEnabled()) {
    const aMM = state.settleFlow.positionDetails?.amm;
    if (!aMM) {
      return '';
    }
    return aMM.underlyingToken.name;
  }
  const aMM = state.settleFlow.position?.amm;
  if (!aMM) {
    return '';
  }
  return aMM.underlyingToken.name;
};
