import { DateTime } from 'luxon';

export type FixedBorrowTableFields = 'protocol' | 'debt' | 'fixedApr';
export type VariableBorrowTableFields = 'protocol' | 'debt' | 'variableApy';

export type FixedBorrowTableDatum = {
    id: string;
    protocol: string;
    startDate: DateTime;
    endDate: DateTime;
    isBorrowing: boolean;
};

export const FixedBorrowTableLabels: Record<FixedBorrowTableFields, string> = {
  protocol: 'Variable Positions',
  debt: 'Debt',
  fixedApr: 'Fixed Rate'
};

export const labels: [FixedBorrowTableFields, string][] = [
  ['protocol', FixedBorrowTableLabels.protocol],
  ['debt', FixedBorrowTableLabels.debt],
  ['fixedApr', FixedBorrowTableLabels.fixedApr]
];

export const VariableBorrowTableLabels: Record<VariableBorrowTableFields, string> = {
  protocol: 'Variable Positions',
  debt: 'Debt',
  variableApy: 'Variable Rate'
};

export const labelsVariable: [VariableBorrowTableFields, string][] = [
  ['protocol', VariableBorrowTableLabels.protocol],
  ['debt', VariableBorrowTableLabels.debt],
  ['variableApy', VariableBorrowTableLabels.variableApy]
];

export type BorrowAMMTableDatum = {
  id: string;
  protocol: string;
  startDate: DateTime;
  endDate: DateTime;
};
  