import { BorrowAMMTableDatum } from '../types';

import { BorrowAMM } from '@voltz-protocol/v1-sdk';

const mapAmmToAmmTableDatum = ({ id, amm }: BorrowAMM): BorrowAMMTableDatum | undefined => {
  if (amm) {
    return {
      id,
      protocol: amm.protocol,
      underlyingTokenName: amm.underlyingToken.name,
      startDate: amm.startDateTime,
      endDate: amm.endDateTime,
    };
  }
  return undefined;
};

export default mapAmmToAmmTableDatum;
