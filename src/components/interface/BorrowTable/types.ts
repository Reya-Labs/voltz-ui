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
  debt: 'Debt',
  fixedApr: 'Fixed APR',
  maturity: 'Maturity',
};

export const labels: [FixedBorrowTableFields, string][] = [
  ['protocol', FixedBorrowTableLabels.protocol],
  ['debt', FixedBorrowTableLabels.debt],
  ['fixedApr', FixedBorrowTableLabels.fixedApr],
  ['maturity', FixedBorrowTableLabels.maturity],
];

  