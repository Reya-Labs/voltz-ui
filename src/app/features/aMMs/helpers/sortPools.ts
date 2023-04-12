import orderBy from 'lodash.orderby';

import { PoolSortDirection } from '../constants';
import { PoolUI } from '../types';

export const sortPools = (
  pools: PoolUI[],
  {
    nameSortingDirection,
    fixedAPRSortingDirection,
    variableAPYSortingDirection,
    maturitySortingDirection,
  }: {
    nameSortingDirection: PoolSortDirection;
    fixedAPRSortingDirection: PoolSortDirection;
    variableAPYSortingDirection: PoolSortDirection;
    maturitySortingDirection: PoolSortDirection;
  },
) => {
  const fields = [];
  const directions: ('asc' | 'desc')[] = [];
  if (nameSortingDirection !== 'noSort') {
    fields.push('name');
    directions.push(nameSortingDirection === 'ascending' ? 'asc' : 'desc');
  }
  if (fixedAPRSortingDirection !== 'noSort') {
    fields.push('fixedRate');
    directions.push(fixedAPRSortingDirection === 'ascending' ? 'asc' : 'desc');
  }
  if (variableAPYSortingDirection !== 'noSort') {
    fields.push('variableRate');
    directions.push(variableAPYSortingDirection === 'ascending' ? 'asc' : 'desc');
  }
  if (maturitySortingDirection !== 'noSort') {
    fields.push('maturityTimestampInMS');
    directions.push(maturitySortingDirection === 'ascending' ? 'asc' : 'desc');
  }
  return orderBy(pools, fields, directions);
};
