import React from 'react';
import { Position } from '@voltz-protocol/v1-sdk';
import { List } from '@mui/material';
import { SystemStyleObject, Theme } from '@mui/system';
import TransactionListItem from './TransactionListItem';
import colors from '../../../theme/colors';
import { getTransactions, sortTransactions } from './services';

interface TransactionListProps {
  position: Position;
}

const TransactionList = ({ position }: TransactionListProps) => {
  const transactions = sortTransactions(getTransactions(position));

  const listStyles: SystemStyleObject<Theme> = {
    width: '100%', 
    padding: (theme) => `0 ${theme.spacing(4)}`,
    background: colors.lavenderWeb.darken040,
    boxSizing: 'border-box',
    borderRadius: `8px`,
  }

  return (
    <List sx={listStyles}>
      {transactions.map(tx => (
        <TransactionListItem position={position} transaction={tx} key={tx.id} />
      ))}
    </List>
  )
}

export default TransactionList;