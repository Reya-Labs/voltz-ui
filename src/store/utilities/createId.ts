import { Transaction } from '../types';

const createId = (transaction: Omit<Transaction, 'id'>): string => {
  const fixedLow = transaction.fixedLow.toString();
  const fixedHigh = transaction.fixedHigh.toString();
  const notional = transaction.notional.toString();
  const margin = transaction.margin.toString();

  return `${transaction.ammId}${fixedLow}${fixedHigh}${notional}${margin}`;
};

export default createId;
