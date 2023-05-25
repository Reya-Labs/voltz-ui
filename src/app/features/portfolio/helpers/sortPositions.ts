import orderBy from 'lodash.orderby';

import { PositionSortDirection, PositionUI } from '../types';

export const sortPositions = (
  positions: PositionUI[],
  {
    marginSortingDirection,
    notionalSortingDirection,
  }: {
    marginSortingDirection: PositionSortDirection;
    notionalSortingDirection: PositionSortDirection;
  },
) => {
  const fields = [];
  const directions: ('asc' | 'desc')[] = [];
  if (marginSortingDirection !== 'noSort') {
    fields.push('margin');
    directions.push(marginSortingDirection === 'ascending' ? 'asc' : 'desc');
  }
  if (notionalSortingDirection !== 'noSort') {
    fields.push('notional');
    directions.push(notionalSortingDirection === 'ascending' ? 'asc' : 'desc');
  }
  return orderBy(positions, fields, directions);
};
