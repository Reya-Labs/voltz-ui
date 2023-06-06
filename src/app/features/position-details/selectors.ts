import { PortfolioPositionAMM } from '@voltz-protocol/v1-sdk';

import { formatPOSIXTimestamp } from '../../../utilities/date';
import { compactFormatToParts } from '../../../utilities/number';
import { RootState } from '../../store';
import { formFormatNumber } from '../forms/common/utils';

export type PositionDetailsUI = {
  id: string;
  variant: 'matured' | 'settled' | 'active';
  type: 'LP' | 'Variable' | 'Fixed';
  creationTimestampInMS: number;

  tokenPriceUSD: number;
  notional: number;
  margin: number;

  canEdit: boolean;
  canSettle: boolean;
  rolloverAmmId: null | string;

  realizedPNLFees: number;
  realizedPNLCashflow: number;
  realizedPNLTotal: number;

  amm: PortfolioPositionAMM;
  canRollover: boolean;
  creationTimestampInMSFormatted: string;
  notionalUSDCompactFormatted: {
    compactNumber: string;
    compactSuffix: string;
  };
  marginUSDCompactFormatted: {
    compactNumber: string;
    compactSuffix: string;
  };
  realizedPNLFeesUSDCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
  realizedPNLCashflowUSDCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };
  realizedPNLTotalUSDCompactFormat: {
    compactNumber: string;
    compactSuffix: string;
  };

  history: {
    type: 'swap' | 'mint' | 'burn' | 'margin-update' | 'liquidation' | 'settlement' | 'maturity';
    creationTimestampInMS: number;
    notional: number;
    paidFees: number;
    fixedRate: number;
    marginDelta: number;
    creationTimestampInMSFormatted: string;
    notionalUSDCompactFormat: {
      compactNumber: string;
      compactSuffix: string;
    };
    paidFeesUSDCompactFormat: {
      compactNumber: string;
      compactSuffix: string;
    };
    fixedRatePercentage: string;
    marginDeltaUSDCompactFormat: {
      compactNumber: string;
      compactSuffix: string;
    };
  }[];
};

export const selectPositionDetailsLoadingState = (positionId: string) => (state: RootState) => {
  const details = state.positionDetails.details[positionId];
  if (!details || !details.value) {
    return 'idle';
  }
  return details.status;
};

export const selectPositionDetails =
  (positionId: string) =>
  (state: RootState): PositionDetailsUI | null => {
    const details = state.positionDetails.details[positionId];
    if (!details) {
      return null;
    }
    const detailsValue = details.value;
    if (!detailsValue) {
      return null;
    }
    const tokenPriceUSD = detailsValue.tokenPriceUSD;
    const notionalUSD = detailsValue.notional * tokenPriceUSD;
    const marginUSD = detailsValue.margin * tokenPriceUSD;
    const realizedPNLTotalUSD = detailsValue.realizedPNLTotal * tokenPriceUSD;
    const realizedPNLFeesUSD = detailsValue.realizedPNLFees * tokenPriceUSD;
    const realizedPNLCashflowUSD = detailsValue.realizedPNLCashflow * tokenPriceUSD;

    return {
      ...detailsValue,
      canRollover: Boolean(detailsValue.rolloverAmmId),
      creationTimestampInMSFormatted: formatPOSIXTimestamp(detailsValue.creationTimestampInMS),
      notionalUSDCompactFormatted: compactFormatToParts(notionalUSD),
      marginUSDCompactFormatted: compactFormatToParts(marginUSD),
      realizedPNLFeesUSDCompactFormat: compactFormatToParts(realizedPNLFeesUSD),
      realizedPNLCashflowUSDCompactFormat: compactFormatToParts(realizedPNLCashflowUSD),
      realizedPNLTotalUSDCompactFormat: compactFormatToParts(realizedPNLTotalUSD),
      history: detailsValue.history.map((historyItem) => {
        const itemNotionalUSD = historyItem.notional * tokenPriceUSD;
        const paidFeesUSD = historyItem.paidFees * tokenPriceUSD;
        const marginDeltaUSD = historyItem.marginDelta * tokenPriceUSD;
        const fixedRatePercentage = historyItem.fixedRate * 100;
        return {
          ...historyItem,
          creationTimestampInMSFormatted: formatPOSIXTimestamp(historyItem.creationTimestampInMS),
          notionalUSDCompactFormat: compactFormatToParts(itemNotionalUSD),
          paidFeesUSDCompactFormat: compactFormatToParts(paidFeesUSD),
          fixedRatePercentage: formFormatNumber(fixedRatePercentage),
          marginDeltaUSDCompactFormat: compactFormatToParts(marginDeltaUSD),
        };
      }),
    };
  };
