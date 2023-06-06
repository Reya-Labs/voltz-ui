import React from 'react';

import { PositionDetailsUI } from '../../../../app/features/position-details';
import { Header } from './Header';
import { TransactionHistoryEntry } from './TransactionHistoryEntry';
import {
  TransactionHistoryEntriesBox,
  TransactionHistoryListBox,
} from './TransactionHistoryList.styled';

export const TransactionHistoryList: React.FunctionComponent<{
  history: PositionDetailsUI['history'];
}> = ({ history }) => {
  return (
    <TransactionHistoryListBox>
      <Header />
      <TransactionHistoryEntriesBox>
        {history.map((item, index) => (
          <TransactionHistoryEntry
            key={index}
            backgroundColorToken={index % 2 !== 0 ? 'liberty7' : 'lavenderWeb8'}
            entry={item}
          />
        ))}
      </TransactionHistoryEntriesBox>
    </TransactionHistoryListBox>
  );
};
