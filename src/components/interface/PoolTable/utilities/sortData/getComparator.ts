import { DateTime } from 'luxon';

import { TableOrder, TableFields } from '../../types';
import descendingComparator from './descendingComparator';
import getTransformation from './getTransformation';

export type GetComparatorArgs = {
  order: TableOrder;
  orderBy: TableFields;
};

export type Comparable = DateTime | string | number;

export type GetComparatorResult = (a: Comparable, b: Comparable) => number;

const getComparator = ({ order, orderBy }: GetComparatorArgs): GetComparatorResult => {
  return (a, b) => (order === 'desc' ? 1 : -1) * descendingComparator(a, b);
};

export default getComparator;
