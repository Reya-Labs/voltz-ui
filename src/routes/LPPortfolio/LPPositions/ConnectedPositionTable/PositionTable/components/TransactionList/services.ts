import { Position } from '@voltz-protocol/v1-sdk';
import { BigNumber } from 'ethers';
import JSBI from 'jsbi';

import { SupportedIcons } from '../../../../../../../components/atomic/Icon/types';
import { formatTimestamp } from '../../../../../../../utilities/date';
import { formatCurrency } from '../../../../../../../utilities/number';
import { LPPositionTransaction, TransactionType } from './types';

/**
 * Takes a currency value from a transaction and returns the decimal number version
 * @param position - the position
 * @param num - The transaction currency number (these are JSBI objects)
 */
export const getDescaledValue = (position: Position, num: JSBI) => {
  return position.amm.descale(BigNumber.from(num.toString()));
};

/**
 * Outputs an array of transactions for a given position. The types of transaction differ
 * depending upon the type of position.
 * @param position - the position to compile an array of transactions for
 */
export const getTransactions = (position: Position) => {
  return [
    ...position.mints.map((tx) => ({ ...tx, type: TransactionType.MINT })),
    ...position.burns.map((tx) => ({ ...tx, type: TransactionType.BURN })),
    ...position.marginUpdates.map((tx) => ({ ...tx, type: TransactionType.MARGIN_UPDATE })),
    ...position.settlements.map((tx) => ({ ...tx, type: TransactionType.SETTLEMENT })),
    ...position.liquidations.map((tx) => ({ ...tx, type: TransactionType.LIQUIDATION })),
  ] as LPPositionTransaction[];
};

/**
 * Sorts an array of transactions obtained via the getTransactions function.
 * Transactions are sorted with the newest first.
 * @param transactions
 */
export const sortTransactions = (transactions: LPPositionTransaction[]) => {
  transactions.sort((a, b) => {
    const timeA = JSBI.toNumber(a.transactionTimestamp);
    const timeB = JSBI.toNumber(b.transactionTimestamp);
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
    [TransactionType.BURN]: 'tx-burn',
    [TransactionType.LIQUIDATION]: 'tx-liquidation',
    [TransactionType.MARGIN_UPDATE]: 'tx-margin-update',
    [TransactionType.MINT]: 'tx-mint',
    [TransactionType.SETTLEMENT]: 'tx-settle',
  };

  const getLabel = () => {
    switch (tx.type) {
      case TransactionType.BURN:
        return 'BURN';
      case TransactionType.LIQUIDATION:
        return 'LIQUIDATION';
      case TransactionType.MARGIN_UPDATE:
        return 'MARGIN UPDATE';
      case TransactionType.MINT:
        return 'MINT';
      case TransactionType.SETTLEMENT:
        return 'SETTLE';
    }
  };

  const baseData = {
    date: formatTimestamp(tx.transactionTimestamp),
    icon: iconMap[tx.type],
    label: getLabel(),
    type: tx.type,
    items: [],
  };

  switch (tx.type) {
    case TransactionType.SETTLEMENT:
      return {
        ...baseData,
        items: [
          {
            label: 'cashflow',
            value: `${formatCurrency(
              getDescaledValue(position, tx.settlementCashflow),
              false,
              true,
            )} ${token}`,
          },
        ],
      };

    case TransactionType.MARGIN_UPDATE:
      return {
        ...baseData,
        items: [
          {
            label: 'margin delta',
            value: `${formatCurrency(getDescaledValue(position, tx.marginDelta))} ${token}`,
          },
        ],
      };

    case TransactionType.LIQUIDATION:
      return {
        ...baseData,
        items: [
          {
            label: 'unwound',
            value: `${formatCurrency(getDescaledValue(position, tx.notionalUnwound))} ${token}`,
          },
          {
            label: 'cashflow',
            value: `${formatCurrency(getDescaledValue(position, tx.reward), false, true)} ${token}`,
          },
        ],
      };

    case TransactionType.MINT:
    case TransactionType.BURN:
      return {
        ...baseData,
        items: [
          {
            label: 'notional',
            value: `${formatCurrency(
              position.getNotionalFromLiquidity(BigNumber.from(tx.amount.toString())),
            )} ${token}`,
          },
        ],
      };

    default:
      return baseData;
  }
};
