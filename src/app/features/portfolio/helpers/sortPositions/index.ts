import orderBy from 'lodash.orderby';

import { PositionSortDirection, PositionUI } from '../../types';

export const sortPositions = (
  positions: PositionUI[],
  {
    marginSortingDirection,
    notionalSortingDirection,
    statusSortingDirection,
    nameSortingDirection,
    maturitySortingDirection,
    realizedPNLSortingDirection,
    unrealizedPNLSortingDirection,
  }: {
    marginSortingDirection: PositionSortDirection;
    notionalSortingDirection: PositionSortDirection;
    statusSortingDirection: PositionSortDirection;
    nameSortingDirection: PositionSortDirection;
    maturitySortingDirection: PositionSortDirection;
    unrealizedPNLSortingDirection: PositionSortDirection;
    realizedPNLSortingDirection: PositionSortDirection;
  },
) => {
  const fields = [];
  const directions: ('asc' | 'desc')[] = [];
  if (marginSortingDirection !== 'noSort') {
    fields.push('marginUSD');
    directions.push(marginSortingDirection === 'ascending' ? 'asc' : 'desc');
  }
  if (notionalSortingDirection !== 'noSort') {
    fields.push('notionalUSD');
    directions.push(notionalSortingDirection === 'ascending' ? 'asc' : 'desc');
  }
  if (statusSortingDirection !== 'noSort') {
    fields.push('status.variant');
    directions.push(statusSortingDirection === 'ascending' ? 'asc' : 'desc');
  }
  if (nameSortingDirection !== 'noSort') {
    fields.push('name');
    directions.push(nameSortingDirection === 'ascending' ? 'asc' : 'desc');
  }
  if (maturitySortingDirection !== 'noSort') {
    fields.push('maturityEndTimestampInMS');
    directions.push(maturitySortingDirection === 'ascending' ? 'asc' : 'desc');
  }
  if (unrealizedPNLSortingDirection !== 'noSort') {
    fields.push('unrealizedPNLUSD');
    directions.push(unrealizedPNLSortingDirection === 'ascending' ? 'asc' : 'desc');
  }
  if (realizedPNLSortingDirection !== 'noSort') {
    fields.push('realizedPNLTotalUSD');
    directions.push(realizedPNLSortingDirection === 'ascending' ? 'asc' : 'desc');
  }
  return orderBy(positions, fields, directions);
};
