import { BorrowAMM, SupportedChainId } from '@voltz-protocol/v1-sdk';

import { BorrowAMMTableDatum } from './types';

export const mapAmmToAmmTableDatum = (
  { id, amm }: BorrowAMM,
  chainId: SupportedChainId | null,
): BorrowAMMTableDatum => ({
  id,
  protocol: amm.protocol,
  underlyingTokenName: amm.underlyingToken.name,
  startDate: amm.startDateTime,
  endDate: amm.endDateTime,
  isAaveV3: amm.market.tags.isAaveV3,
});
