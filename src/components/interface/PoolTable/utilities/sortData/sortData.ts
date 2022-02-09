import { TableOrder, TableFields, TableData } from '../../types';

export type SortDataArgs = {
  data: TableData[];
  order: TableOrder;
  orderBy: TableFields;
};

const sortData = ({ data, order, orderBy }: SortDataArgs): TableData[] => {
  return data;
};

export default sortData;
