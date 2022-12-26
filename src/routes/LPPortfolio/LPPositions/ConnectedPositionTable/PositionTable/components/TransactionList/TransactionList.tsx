import { Position } from '@voltz-protocol/v1-sdk';
import React, { useCallback, useState } from 'react';

import { useUniqueId } from '../../../../../../../hooks/useUniqueId';
import { getTransactionData, getTransactions, sortTransactions } from './services';
import { TransactionListBox } from './TransactionList.styled';
import { TransactionListItem } from './TransactionListItem';
import { TransactionType } from './types';

interface TransactionListProps {
  position: Position;
}

export const TransactionList = ({ position }: TransactionListProps) => {
  const transactions = sortTransactions(getTransactions(position));
  const [open, setOpen] = useState(false);
  const id = useUniqueId();

  const handleOpenClose = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  return (
    <TransactionListBox id={id}>
      {(open ? transactions : [transactions[0]]).map((tx, i) => (
        <TransactionListItem
          key={tx.id}
          isLiquidation={tx.type === TransactionType.LIQUIDATION}
          listId={id}
          open={open}
          transactionData={getTransactionData(position, tx)}
          onOpenClose={i === 0 ? handleOpenClose : undefined}
        />
      ))}
    </TransactionListBox>
  );
};
