import { Position } from '@voltz-protocol/v1-sdk';

import { SupportedIcons } from '../../../../../components/atomic/Icon/types';
import { formatTimestamp } from '../../../../../utilities/date';
import { formatCurrency, formatNumber } from '../../../../../utilities/number';
import { TraderPositionTransaction, TraderTransactionType } from './types';

/**
 * Returns the 'avg fix' percentage value for the given parameters
 * @param fixedTokenDeltaUnbalanced
 * @param variableTokenDelta
 */
export const getAvgFix = (fixedTokenDeltaUnbalanced: number, variableTokenDelta: number) => {
  return Math.abs(fixedTokenDeltaUnbalanced / variableTokenDelta);
};

/**
 * Outputs an array of transactions for a given position. The types of transaction differ
 * depending upon the type of position.
 * @param position - the position to compile an array of transactions for
 */
export const getTransactions = (position: Position) => {
  return [
    ...position.swaps.map((tx) => ({ ...tx, type: TraderTransactionType.SWAP })),
    ...position.marginUpdates.map((tx) => ({ ...tx, type: TraderTransactionType.MARGIN_UPDATE })),
    ...position.settlements.map((tx) => ({ ...tx, type: TraderTransactionType.SETTLEMENT })),
    ...position.liquidations.map((tx) => ({ ...tx, type: TraderTransactionType.LIQUIDATION })),
  ] as TraderPositionTransaction[];
};

/**
 * Sorts an array of transactions obtained via the getTransactions function.
 * Transactions are sorted with the newest first.
 * @param transactions
 */
export const sortTransactions = (transactions: TraderPositionTransaction[]) => {
  transactions.sort((a, b) => {
    const timeA = a.creationTimestampInMS;
    const timeB = b.creationTimestampInMS;
    return timeB - timeA;
  });
  return transactions;
};

/**
 * Returns the data needed to render a transaction row in an easy-to-use format
 * @param position - the position
 * @param tx - the transaction to compile the data for
 */
export const getTransactionData = (position: Position, tx: TraderPositionTransaction) => {
  const token = position.amm.underlyingToken.name || '';

  const iconMap: Record<TraderTransactionType, SupportedIcons> = {
    [TraderTransactionType.LIQUIDATION]: 'tx-liquidation',
    [TraderTransactionType.MARGIN_UPDATE]: 'tx-margin-update',
    [TraderTransactionType.SETTLEMENT]: 'tx-settle',
    [TraderTransactionType.SWAP]: 'tx-swap',
  };

  const getLabel = () => {
    switch (tx.type) {
      case TraderTransactionType.LIQUIDATION:
        return 'LIQUIDATION';
      case TraderTransactionType.MARGIN_UPDATE:
        return 'MARGIN UPDATE';
      case TraderTransactionType.SETTLEMENT:
        return 'SETTLE';
      case TraderTransactionType.SWAP:
        return `SWAP ${tx.variableTokenDelta > 0 ? 'VT' : 'FT'}`;
    }
  };

  const baseData = {
    date: formatTimestamp(tx.creationTimestampInMS),
    icon: iconMap[tx.type],
    label: getLabel(),
    type: tx.type,
    items: [],
  };

  switch (tx.type) {
    case TraderTransactionType.SWAP:
      return {
        ...baseData,
        items: [
          {
            label: 'notional',
            value: `${formatCurrency(Math.abs(tx.variableTokenDelta))} ${token}`,
          },
          {
            label: 'avg fix',
            value: `${formatNumber(
              getAvgFix(tx.unbalancedFixedTokenDelta, tx.variableTokenDelta),
            )} %`,
          },
          {
            label: 'fees',
            value: `${formatCurrency(tx.fees)} ${token}`,
          },
        ],
      };

    case TraderTransactionType.SETTLEMENT:
      return {
        ...baseData,
        items: [
          {
            label: 'cashflow',
            value: `${formatCurrency(tx.settlementCashflow, false, true)} ${token}`,
          },
        ],
      };

    case TraderTransactionType.MARGIN_UPDATE:
      return {
        ...baseData,
        items: [
          {
            label: 'margin delta',
            value: `${formatCurrency(tx.marginDelta)} ${token}`,
          },
        ],
      };

    case TraderTransactionType.LIQUIDATION:
      return {
        ...baseData,
        items: [
          {
            label: 'unwound',
            value: `${formatCurrency(tx.notionalUnwound)} ${token}`,
          },
          {
            label: 'cashflow',
            value: `${formatCurrency(tx.loss, false, true)} ${token}`,
          },
        ],
      };

    default:
      return baseData;
  }
};
