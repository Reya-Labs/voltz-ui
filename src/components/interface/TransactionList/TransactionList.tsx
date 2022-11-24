import React, { useCallback, useState } from 'react';
import { Position } from '@voltz-protocol/v1-sdk';
import { List } from '@mui/material';
import { colors, SystemStyleObject, Theme } from '../../../theme';
import { TransactionListItem } from './TransactionListItem';
import { getTransactionData, getTransactions, sortTransactions } from './services';
import { useUniqueId } from '../../../hooks';
import { TransactionType } from './types';

interface TransactionListProps {
  position: Position;
}

const listStyles: SystemStyleObject<Theme> = {
  width: '100%',
  padding: (theme) => `0 ${theme.spacing(4)}`,
  background: colors.lavenderWeb.darken040,
  boxSizing: 'border-box',
  borderRadius: `8px`,
};

export const TransactionList = ({ position }: TransactionListProps) => {
  const transactions = sortTransactions(getTransactions(position));
  const [open, setOpen] = useState(false);
  const id = useUniqueId();

  const handleOpenClose = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  return (
    <List sx={listStyles} id={id}>
      {(open ? transactions : [transactions[0]]).map((tx, i) => (
        <TransactionListItem
          key={tx.id}
          listId={id}
          onOpenClose={i === 0 ? handleOpenClose : undefined}
          open={open}
          transactionData={getTransactionData(position, tx)}
          isLiquidation={tx.type === TransactionType.LIQUIDATION}
        />
      ))}
    </List>
  );
};
