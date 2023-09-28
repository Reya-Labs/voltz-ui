import { AMM } from '@voltz-protocol/v1-sdk';

import { formatTimestamp } from '../../../../../utilities/date';
import { V2Pool } from '../../../aMMs';
import { PortfolioPositionPool } from '../../../position-details';

export const formatPoolMaturity = (pool?: AMM | V2Pool | PortfolioPositionPool | null) => {
  if (!pool) {
    return '';
  }
  return formatTimestamp(pool.termEndTimestampInMS);
};
