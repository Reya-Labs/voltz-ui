import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { formatTimestamp } from '../../../utilities/date';
import { formatNumber } from '../../../utilities/number';
import { RootState } from '../../store';
import { formCompactFormatToParts, formFormatNumber } from '../forms/common/utils';

export const selectSettlePosition = (state: RootState) => {
  return state.settleFlow.positionDetails;
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
  const aMM = state.settleFlow.positionDetails?.pool;
  if (!aMM) {
    return '';
  }
  return formatTimestamp(aMM.termEndTimestampInMS);
};

// todo: FB duplicate as in swap form
export const selectAMMTokenFormatted = (state: RootState) => {
  const aMM = state.settleFlow.positionDetails?.pool;
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
  return formFormatNumber(position.fixLowPercentage);
};

export const selectFixedUpper = (state: RootState) => {
  const position = selectSettlePosition(state);
  if (position === null) {
    return null;
  }
  return formFormatNumber(position.fixHighPercentage);
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
  const feesPaid = position.realizedPNLFees;
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
  const settlementCashflow = position.realizedPNLCashflow;
  const fees = position.realizedPNLFees;

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
  const settlementCashflow = position.realizedPNLCashflow;
  const feesPaid = position.realizedPNLFees;

  const realizedPnL = settlementCashflow + feesPaid;

  const compactPartsTotal = formCompactFormatToParts(realizedPnL);
  const compactPartsFees = formCompactFormatToParts(feesPaid);
  const compactPartsSwaps = formCompactFormatToParts(settlementCashflow);
  return {
    compactRealizedPnLSuffix: compactPartsTotal.compactSuffix,
    compactRealizedPnLTotal: compactPartsTotal.compactNumber,
    compactRealizedPnLFees: `${compactPartsFees.compactNumber}${compactPartsFees.compactSuffix}`,
    compactRealizedPnLSwaps: `${compactPartsSwaps.compactNumber}${compactPartsFees.compactSuffix}`,
  };
};

export const selectAMMMarket = (state: RootState) => {
  const aMM = state.settleFlow.positionDetails?.pool;
  if (!aMM) {
    return '';
  }
  return aMM.market;
};

// todo: FB duplicate as in swap form
export const selectAMMToken = (state: RootState) => {
  const aMM = state.settleFlow.positionDetails?.pool;
  if (!aMM) {
    return '';
  }
  return aMM.underlyingToken.name;
};

export const selectIsGLP28June = (state: RootState): boolean => {
  const aMM = state.settleFlow.positionDetails?.pool;

  if (!aMM) {
    return false;
  }

  const marginEngineAddress = aMM.marginEngineAddress;

  const isGLP28Jun2023: boolean =
    marginEngineAddress === '0xbe958ba49be73d3020cb62e512619da953a2bab1';

  return isGLP28Jun2023;
};
