import { AugmentedBorrowAMM } from '@utilities';
import { BorrowAMMTableDatum } from '../types';

const mapAmmToAmmTableDatum = ({
  id,
  amm,
}: AugmentedBorrowAMM): BorrowAMMTableDatum | undefined => {
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
