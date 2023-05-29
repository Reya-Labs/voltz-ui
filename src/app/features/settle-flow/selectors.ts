import { getViewOnEtherScanLink } from '@voltz-protocol/v1-sdk';

import { formatTimestamp } from '../../../utilities/date';
import { formatNumber } from '../../../utilities/number';
import { RootState } from '../../store';
import { formCompactFormatToParts } from '../forms/common/utils';

export const selectSettleAMM = (state: RootState) => state.settleFlow.position?.amm;
export const selectSettlePosition = (state: RootState) => state.settleFlow.position;
export const selectSettleVariant = (state: RootState) => {
  if (!state.settleFlow.position) {
    return null;
  }
  return state.settleFlow.position.positionType === 3 ? 'lp' : 'trader';
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

export const selectCompactDepositedMargin = (state: RootState) => {
  const position = selectSettlePosition(state);
  if (position === null) {
    return {
      compactDepositedMarginSuffix: '',
      compactDepositedMarginNumber: '--',
    };
  }
  const depositedMargin = position.margin - position.realizedPnLFromFeesPaid;

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
  const netBalance = position.margin + position.settlementCashflow + position.fees;

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
  const fees = position.fees + position.realizedPnLFromFeesPaid;
  const realizedPnL = position.settlementCashflow + fees;

  const compactPartsTotal = formCompactFormatToParts(realizedPnL);
  const compactPartsFees = formCompactFormatToParts(
    position.fees + position.realizedPnLFromFeesPaid,
  );
  const compactPartsSwaps = formCompactFormatToParts(position.settlementCashflow);
  return {
    compactRealizedPnLSuffix: compactPartsTotal.compactSuffix,
    compactRealizedPnLTotal: compactPartsTotal.compactNumber,
    compactRealizedPnLFees: `${compactPartsFees.compactNumber}${compactPartsFees.compactSuffix}`,
    compactRealizedPnLSwaps: `${compactPartsSwaps.compactNumber}${compactPartsFees.compactSuffix}`,
  };
};
