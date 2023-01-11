import { BorrowAMM } from '@voltz-protocol/v1-sdk';

import { BorrowAMMTableDatum } from './types';

export const mapAmmToAmmTableDatum = ({ id, amm }: BorrowAMM): BorrowAMMTableDatum => {
  return {
    id,
    protocol: amm.protocol,
    underlyingTokenName: amm.underlyingToken.name,
    startDate: amm.startDateTime,
    endDate: amm.endDateTime,
  };
};
