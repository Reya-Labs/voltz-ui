import { TableOrder, TableFields, TableData } from '../types';
import getComparator from './getComparator';

export type SortDataArgs = {
  data: TableData[];
  order: TableOrder;
  orderBy: TableFields;
};

const sortData = ({ data, order, orderBy }: SortDataArgs): TableData[] => {
  return data.sort(getComparator({ order, orderBy }));
};

export default sortData;
