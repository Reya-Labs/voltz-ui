import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { formatTimestamp } from '../../../utilities/date';
import { formatNumber } from '../../../utilities/number';
import { RootState } from '../../store';
import { formCompactFormatToParts } from '../forms/common/utils';

export const selectSettleAMM = (state: RootState) => state.settleFlow.position?.amm;
export const selectSettlePosition = (state: RootState) => state.settleFlow.position;
export const selectSettleVariant = (state: RootState) => state.settleFlow.variant;
export const selectSettleError = (state: RootState) => state.settleFlow.error;
export const selectSettleStep = (state: RootState) => state.settleFlow.step;
export const selectConfirmationFlowEtherscanLink = (state: RootState) => {
  return getViewOnEtherScanLink(state.network.chainId, state.settleFlow.txHash || '');
};
export const selectSettleGasFeeETH = (state: RootState) => {
  const infoPostSettlePosition = state.settleFlow.infoPostSettlePosition;
  if (infoPostSettlePosition.status !== 'success') {
    return '--';
  }
  return formatNumber(infoPostSettlePosition.value.gasFeeETH, 2, 4);
};

// todo: FB duplicate as in swap form
export const selectAMMMaturityFormatted = (state: RootState) => {
  const aMM = selectSettleAMM(state);
  if (!aMM) {
    return '';
  }
  return formatTimestamp(aMM.termEndTimestampInMS);
};

// todo: FB duplicate as in swap form
export const selectAMMTokenFormatted = (state: RootState) => {
  const aMM = selectSettleAMM(state);
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

  return position.fixedRateLower.toNumber();
};

export const selectFixedUpper = (state: RootState) => {
  const position = selectSettlePosition(state);
  if (position === null) {
    return null;
  }
  return position.fixedRateUpper.toNumber();
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

export const selectCompactMargin = (state: RootState) => {
  const position = selectSettlePosition(state);
  if (position === null) {
    return {
      compactMarginSuffix: '',
      compactMarginNumber: '--',
    };
  }
  const margin = position.margin;

  const compactParts = formCompactFormatToParts(margin);
  return {
    compactMarginSuffix: compactParts.compactSuffix,
    compactMarginNumber: compactParts.compactNumber,
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
  const netBalance = position.margin + position.settlementCashflow;

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
      compactRealizedPnLNumber: '--',
    };
  }
  const realizedPnL = position.settlementCashflow;

  const compactParts = formCompactFormatToParts(realizedPnL);
  return {
    compactRealizedPnLSuffix: compactParts.compactSuffix,
    compactRealizedPnLNumber: compactParts.compactNumber,
  };
};
