import { DateTime } from 'luxon';

export type FixedBorrowTableFields = 'protocol' | 'debt' | 'fixedApr' | 'maturity';
export type VariableBorrowTableFields = 'protocol' | 'debt' | 'variableApy';

export type FixedBorrowTableDatum = {
    id: string;
    protocol: string;
    startDate: DateTime;
    endDate: DateTime;
    isBorrowing: boolean;
};

export const FixedBorrowTableLabels: Record<FixedBorrowTableFields, string> = {
  protocol: 'Pool',
  fixedApr: 'Fixed APR',
  debt: 'Debt',
  maturity: 'Fixed Until'
};

export const labelsFixed: [FixedBorrowTableFields, string][] = [
  ['protocol', FixedBorrowTableLabels.protocol],
  ['fixedApr', FixedBorrowTableLabels.fixedApr],
  ['debt', FixedBorrowTableLabels.debt],
  ['maturity', FixedBorrowTableLabels.maturity]
];

export const VariableBorrowTableLabels: Record<VariableBorrowTableFields, string> = {
  protocol: 'Pool',
  variableApy: 'Variable Apy',
  debt: 'Debt'
};

export const labelsVariable: [VariableBorrowTableFields, string][] = [
  ['protocol', VariableBorrowTableLabels.protocol],
  ['variableApy', VariableBorrowTableLabels.variableApy],
  ['debt', VariableBorrowTableLabels.debt],
];

export type BorrowAMMTableDatum = {
  id: string;
  protocol: string;
  startDate: DateTime;
  endDate: DateTime;
};
  