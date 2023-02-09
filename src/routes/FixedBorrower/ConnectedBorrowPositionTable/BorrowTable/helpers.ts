import { BorrowAMM, SupportedNetworksEnum } from '@voltz-protocol/v1-sdk';

import { getConfig } from '../../../../hooks/voltz-config/config';
import { isAaveV3 } from '../../../../utilities/amm';
import { BorrowAMMTableDatum } from './types';

export const mapAmmToAmmTableDatum = (
  { id, amm }: BorrowAMM,
  network: SupportedNetworksEnum,
): BorrowAMMTableDatum => ({
  id,
  protocol: amm.protocol,
  underlyingTokenName: amm.underlyingToken.name,
  startDate: amm.startDateTime,
  endDate: amm.endDateTime,
  isAaveV3: isAaveV3(getConfig(network)?.pools || [], id),
});
