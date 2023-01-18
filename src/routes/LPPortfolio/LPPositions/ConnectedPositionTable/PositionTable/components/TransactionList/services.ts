import { Position } from '@voltz-protocol/v1-sdk';

import { SupportedIcons } from '../../../../../../../components/atomic/Icon/types';
import { formatTimestamp } from '../../../../../../../utilities/date';
import { formatCurrency } from '../../../../../../../utilities/number';
import { LPPositionTransaction, LPTransactionType } from './types';

/**
 * Outputs an array of transactions for a given position. The types of transaction differ
 * depending upon the type of position.
 * @param position - the position to compile an array of transactions for
 */
export const getTransactions = (position: Position) => {
  return [
    ...position.mints.map((tx) => ({ ...tx, type: LPTransactionType.MINT })),
    ...position.burns.map((tx) => ({ ...tx, type: LPTransactionType.BURN })),
    ...position.marginUpdates.map((tx) => ({ ...tx, type: LPTransactionType.MARGIN_UPDATE })),
    ...position.settlements.map((tx) => ({ ...tx, type: LPTransactionType.SETTLEMENT })),
    ...position.liquidations.map((tx) => ({ ...tx, type: LPTransactionType.LIQUIDATION })),
  ] as LPPositionTransaction[];
};

/**
 * Sorts an array of transactions obtained via the getTransactions function.
 * Transactions are sorted with the newest first.
 * @param transactions
 */
export const sortTransactions = (transactions: LPPositionTransaction[]) => {
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
export const getTransactionData = (position: Position, tx: LPPositionTransaction) => {
  const token = position.amm.underlyingToken.name || '';

  const iconMap: Record<LPPositionTransaction['type'], SupportedIcons> = {
    [LPTransactionType.BURN]: 'tx-burn',
    [LPTransactionType.LIQUIDATION]: 'tx-liquidation',
    [LPTransactionType.MARGIN_UPDATE]: 'tx-margin-update',
    [LPTransactionType.MINT]: 'tx-mint',
    [LPTransactionType.SETTLEMENT]: 'tx-settle',
  };

  const getLabel = () => {
    switch (tx.type) {
      case LPTransactionType.BURN:
        return 'BURN';
      case LPTransactionType.LIQUIDATION:
        return 'LIQUIDATION';
      case LPTransactionType.MARGIN_UPDATE:
        return 'MARGIN UPDATE';
      case LPTransactionType.MINT:
        return 'MINT';
      case LPTransactionType.SETTLEMENT:
        return 'SETTLE';
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
    case LPTransactionType.SETTLEMENT:
      return {
        ...baseData,
        items: [
          {
            label: 'cashflow',
            value: `${formatCurrency(tx.settlementCashflow, false, true)} ${token}`,
          },
        ],
      };

    case LPTransactionType.MARGIN_UPDATE:
      return {
        ...baseData,
        items: [
          {
            label: 'margin delta',
            value: `${formatCurrency(tx.marginDelta)} ${token}`,
          },
        ],
      };

    case LPTransactionType.LIQUIDATION:
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

    case LPTransactionType.MINT:
    case LPTransactionType.BURN:
      return {
        ...baseData,
        items: [
          {
            label: 'notional',
            value: `${formatCurrency(tx.liquidity)} ${token}`,
          },
        ],
      };

    default:
      return baseData;
  }
};
