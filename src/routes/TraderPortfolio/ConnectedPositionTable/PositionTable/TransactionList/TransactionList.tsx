import List from '@mui/material/List';
import { Position } from '@voltz-protocol/v1-sdk';
import React, { useCallback, useState } from 'react';

import { useUniqueId } from '../../../../../hooks/useUniqueId';
import { colors, SystemStyleObject, Theme } from '../../../../../theme';
import { getTransactionData, getTransactions, sortTransactions } from './services';
import { TransactionListItem } from './TransactionListItem';
import { TraderTransactionType } from './types';

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
    <List id={id} sx={listStyles}>
      {(open ? transactions : [transactions[0]]).map((tx, i) => (
        <TransactionListItem
          key={tx.id}
          isLiquidation={tx.type === TraderTransactionType.LIQUIDATION}
          listId={id}
          open={open}
          transactionData={getTransactionData(position, tx)}
          onOpenClose={i === 0 ? handleOpenClose : undefined}
        />
      ))}
    </List>
  );
};
