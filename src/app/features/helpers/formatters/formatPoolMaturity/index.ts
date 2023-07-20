import { AMM } from '@voltz-protocol/v1-sdk';

import { formatTimestamp } from '../../../../../utilities/date';
import { PortfolioPositionPool } from '../../../position-details';

export const formatPoolMaturity = (pool?: AMM | PortfolioPositionPool | null) => {
  if (!pool) {
    return '';
  }
  return formatTimestamp(pool.termEndTimestampInMS);
};
