import React from 'react';
import { Position } from '@voltz-protocol/v1-sdk';
import { FCMPositionTransaction, MEPositionTransaction, TransactionType } from './types';
import { List } from '@mui/material';
import { SystemStyleObject, Theme } from '@mui/system';
import TransactionListItem from './TransactionListItem';
import colors from '../../../theme/colors';
import JSBI from 'jsbi';

interface TransactionListProps {
  position: Position;
}

const getTransactions = (position: Position) => {
  if(position.source === 'ME') {
    return [
      ...position.swaps.map(tx => ({ ...tx, type: TransactionType.SWAP })),
      ...position.marginUpdates.map(tx => ({ ...tx, type: TransactionType.MARGIN_UPDATE })),
      ...position.settlements.map(tx => ({ ...tx, type: TransactionType.SETTLEMENT })),
      ...position.liquidations.map(tx => ({ ...tx, type: TransactionType.LIQUIDATION })),
    ] as MEPositionTransaction[];
  } else {
    return [
      ...position.fcmSwaps.map(tx => ({ ...tx, type: TransactionType.FCM_SWAP })),
      ...position.fcmUnwinds.map(tx => ({ ...tx, type: TransactionType.FCM_UNWIND })),
      ...position.fcmSettlements.map(tx => ({ ...tx, type: TransactionType.FCM_SETTLEMENT })),
    ] as FCMPositionTransaction[];
  }
}

const sortTransactions = (transactions: MEPositionTransaction[] | FCMPositionTransaction[]) => {
  transactions.sort((a,b) => {
    const timeA = JSBI.toNumber(a.transactionTimestamp);
    const timeB = JSBI.toNumber(b.transactionTimestamp);
    return timeB - timeA;
  });
  return transactions;
}

const TransactionList = ({ position }: TransactionListProps) => {
  const transactions = sortTransactions(getTransactions(position));

  const listStyles: SystemStyleObject<Theme> = {
    width: '100%', 
    padding: (theme) => `0 ${theme.spacing(4)}`,
    background: colors.lavenderWeb.darken040,
    boxSizing: 'border-box'
  }

  return (
    <List sx={listStyles}>
      {transactions.map(tx => <TransactionListItem transaction={tx} />)}
    </List>
  )
}

export default TransactionList;