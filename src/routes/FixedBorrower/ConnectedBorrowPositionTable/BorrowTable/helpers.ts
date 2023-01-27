import { BorrowAMM } from '@voltz-protocol/v1-sdk';

import { BorrowAMMTableDatum } from './types';
import { getConfig } from '../../../../hooks/voltz-config/config';
import { isAaveV3 } from '../../../../utilities/amm';

export const mapAmmToAmmTableDatum = ({ id, amm }: BorrowAMM): BorrowAMMTableDatum => ({
  id,
  protocol: amm.protocol,
  underlyingTokenName: amm.underlyingToken.name,
  startDate: amm.startDateTime,
  endDate: amm.endDateTime,
  isAaveV3: isAaveV3(getConfig().pools, id),
});
