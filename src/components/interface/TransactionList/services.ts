import { formatCurrency, formatNumber, formatTimestamp } from "@utilities";
import { Position } from "@voltz-protocol/v1-sdk";
import { BigNumber } from "ethers";
import JSBI from "jsbi";
import { Icons } from "@components/atomic";
import { TransactionType, TraderPositionTransaction, LPPositionTransaction, FCMPositionTransaction } from "./types";

/**
 * Takes a currency value from a transaction and returns the decimal number version
 * @param num - The transaction currency number (these are JSBI objects)
 */
export const getDescaledValue = (position: Position, num: JSBI) => {
  return position.amm.descale(BigNumber.from(num.toString()))
}

/**
 * Returns the 'avg fix' percentage value for the given parameters 
 * @param fixedTokenDeltaUnbalanced 
 * @param variableTokenDelta 
 */
export const getAvgFix = (fixedTokenDeltaUnbalanced: JSBI, variableTokenDelta: JSBI) => {
  return Math.abs(JSBI.toNumber(JSBI.divide(JSBI.multiply(fixedTokenDeltaUnbalanced, JSBI.BigInt(1000)), variableTokenDelta)) / 1000);
}

/**
 * Outputs an array of transactions for a given position. The types of transaction differ 
 * depending upon the type of position.
 * @param position - the position to compile an array of transactions for
 */
export const getTransactions = (position: Position ) => {
  if(position.source === 'ME' && position.positionType !== 3) {
    return [
      ...position.swaps.map(tx => ({ ...tx, type: TransactionType.SWAP })),
      ...position.marginUpdates.map(tx => ({ ...tx, type: TransactionType.MARGIN_UPDATE })),
      ...position.settlements.map(tx => ({ ...tx, type: TransactionType.SETTLEMENT })),
      ...position.liquidations.map(tx => ({ ...tx, type: TransactionType.LIQUIDATION })),
    ] as TraderPositionTransaction[];
  } else if(position.source === 'ME' && position.positionType === 3) {
      return [
        ...position.mints.map(tx => ({ ...tx, type: TransactionType.MINT })),
        ...position.burns.map(tx => ({ ...tx, type: TransactionType.BURN })),
        ...position.marginUpdates.map(tx => ({ ...tx, type: TransactionType.MARGIN_UPDATE })),
        ...position.settlements.map(tx => ({ ...tx, type: TransactionType.SETTLEMENT })),
        ...position.liquidations.map(tx => ({ ...tx, type: TransactionType.LIQUIDATION })),
      ] as LPPositionTransaction[];
  } else {
    return [
      ...position.fcmSwaps.map(tx => ({ ...tx, type: TransactionType.FCM_SWAP })),
      ...position.fcmUnwinds.map(tx => ({ ...tx, type: TransactionType.FCM_UNWIND })),
      ...position.fcmSettlements.map(tx => ({ ...tx, type: TransactionType.FCM_SETTLEMENT })),
    ] as FCMPositionTransaction[];
  }
}

/**
 * Sorts an array of transactions obtained via the getTransactions function. Transactions are sorted 
 * newest first. 
 * @param transactions 
 */
export const sortTransactions = (transactions: TraderPositionTransaction[] | FCMPositionTransaction[] | LPPositionTransaction[]) => {
  transactions.sort((a,b) => {
    const timeA = JSBI.toNumber(a.transactionTimestamp);
    const timeB = JSBI.toNumber(b.transactionTimestamp);
    return timeB - timeA;
  });
  return transactions;
}

/**
 * Returns the data needed to render a transaction row in an easy to use format
 * @param tx - the transaction to compile the data for
 */
export const getTransactionData = (position: Position, tx: TraderPositionTransaction | FCMPositionTransaction | LPPositionTransaction) => {
  const token = position.amm.underlyingToken.name || '';
  
  const iconMap:Record<TransactionType, Icons> = {
    [TransactionType.BURN]: 'tx-burn',
    [TransactionType.FCM_SWAP]: 'tx-swap',
    [TransactionType.FCM_SETTLEMENT]: 'tx-settle',
    [TransactionType.FCM_UNWIND]: 'tx-swap',
    [TransactionType.LIQUIDATION]: 'tx-liquidation',
    [TransactionType.MARGIN_UPDATE]: 'tx-margin-update',
    [TransactionType.MINT]: 'tx-mint',
    [TransactionType.SETTLEMENT]: 'tx-settle',
    [TransactionType.SWAP]: 'tx-swap',
  };

  const getLabel = () => {
    switch(tx.type) {
      case TransactionType.BURN: return 'BURN';
      case TransactionType.FCM_SWAP: return 'SWAP (FT)';
      case TransactionType.FCM_SETTLEMENT: return 'SETTLE';
      case TransactionType.FCM_UNWIND: return 'UNWIND (VT)';
      case TransactionType.LIQUIDATION: return 'LIQUIDATION';
      case TransactionType.MARGIN_UPDATE: return 'MARGIN UPDATE';
      case TransactionType.MINT: return 'MINT';
      case TransactionType.SETTLEMENT: return 'SETTLE';
      case TransactionType.SWAP: return `SWAP ${JSBI.GT(tx.variableTokenDelta, 0) ? 'VT' : 'FT'}`;
    }
  };

  const baseData = {
    date: formatTimestamp(tx.transactionTimestamp),
    icon: iconMap[tx.type],
    label: getLabel(),
    type: tx.type,
    items: []
  }

  switch(tx.type) {
    case TransactionType.SWAP:
    case TransactionType.FCM_SWAP:
    case TransactionType.FCM_UNWIND:
      return {
        ...baseData,
        items: [
          {
            label: 'notional', 
            value: `${formatCurrency(getDescaledValue(position, tx.desiredNotional))} ${token}`
          },
          {
            label: 'avg fix', 
            value: `${formatNumber(getAvgFix(tx.fixedTokenDeltaUnbalanced, tx.variableTokenDelta))} %`
          },
          {
            label: 'fees', 
            value: `${formatCurrency(getDescaledValue(position, tx.cumulativeFeeIncurred))} ${token}`
          },
        ]
      }

    case TransactionType.SETTLEMENT:
    case TransactionType.FCM_SETTLEMENT:
      return {
        ...baseData,
        items: [
          {
            label: 'cashflow', 
            value: `${formatCurrency(getDescaledValue(position, tx.settlementCashflow), false, true)} ${token}`
          },
        ]
      }

    case TransactionType.MARGIN_UPDATE:
      return {
        ...baseData,
        items: [
          {
            label: 'margin delta', 
            value: `${formatCurrency(getDescaledValue(position, tx.marginDelta))} ${token}`
          },
        ]
      }

    case TransactionType.LIQUIDATION:
      return {
        ...baseData,
        items: [
          {
            label: 'unwound', 
            value: `${formatCurrency(getDescaledValue(position, tx.notionalUnwound))} ${token}`
          },
          {
            label: 'cashflow', 
            value: `${formatCurrency(getDescaledValue(position, tx.reward), false, true)} ${token}`
          },
        ]
      }

    case TransactionType.MINT:
    case TransactionType.BURN:
      return {
        ...baseData,
        items: [
          {
            label: 'notional', 
            value: `${formatCurrency(position.getNotionalFromLiquidity(tx.amount))} ${token}`
          }
        ]
      }

    default:
      return baseData;
  }
}

