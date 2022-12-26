import React from 'react';

import { colors } from '../../../../../../../theme';
import { getTransactionData } from './services';
import {
  CellBox,
  DateTypography,
  HistoryButton,
  Icon,
  ItemLabelTypography,
  LabelCellBox,
  LabelTypography,
  TransactionListItemBox,
  TransactionListItemLeftBox,
} from './TransactionListItem.styled';

interface TransactionListItemProps {
  listId?: string | number;
  onOpenClose?: () => void;
  open?: boolean;
  isLiquidation: boolean;
  transactionData: ReturnType<typeof getTransactionData>;
}

export const TransactionListItem = ({
  listId,
  onOpenClose,
  open = false,
  transactionData,
  isLiquidation,
}: TransactionListItemProps) => {
  const data = transactionData;

  return (
    <TransactionListItemBox>
      <TransactionListItemLeftBox>
        <CellBox>
          <DateTypography>{data.date}</DateTypography>
        </CellBox>
        <CellBox>
          <Icon name={data.icon} />
        </CellBox>
        <LabelCellBox>
          <LabelTypography sx={isLiquidation ? { color: colors.wildStrawberry.base } : undefined}>
            {data.label}
          </LabelTypography>
        </LabelCellBox>
        {data.items.map((item, index) => (
          <CellBox key={`${item.label}-${index}`}>
            <ItemLabelTypography>{item.label}:</ItemLabelTypography>
            <LabelTypography sx={isLiquidation ? { color: colors.wildStrawberry.base } : undefined}>
              {item.value}
            </LabelTypography>
          </CellBox>
        ))}
      </TransactionListItemLeftBox>
      {onOpenClose && (
        <HistoryButton
          aria-controls={listId?.toString()}
          aria-expanded={open}
          onClick={onOpenClose}
        >
          {open ? 'X' : 'TX History'}
        </HistoryButton>
      )}
    </TransactionListItemBox>
  );
};
