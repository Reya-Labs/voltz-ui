import { TableOrder, TableFields, TableData } from '../../types';
import descendingComparator from './descendingComparator';

export type GetComparatorArgs = {
  order: TableOrder;
  orderBy: TableFields;
};

export type GetComparatorResult = (a: TableData, b: TableData) => number;

const getComparator = ({ order, orderBy }: GetComparatorArgs): GetComparatorResult => {
  if (orderBy === 'maturity') {
    return (a, b) => {
      const aEndMillis = a.endDate.toMillis();
      const bEndMillis = b.endDate.toMillis();

      return (order === 'desc' ? 1 : -1) * descendingComparator(aEndMillis, bEndMillis);
    };
  }

  return (a, b) => (order === 'desc' ? 1 : -1) * descendingComparator(a[orderBy], b[orderBy]);
};

export default getComparator;
