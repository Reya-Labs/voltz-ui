import { AugmentedBorrowAMM } from '@utilities';
import { BorrowAMMTableDatum } from '../types';

const mapAmmToAmmTableDatum = ({
  id,
  amm
}: AugmentedBorrowAMM): BorrowAMMTableDatum | undefined => {
  if (amm ) {
    return {
      id,
      protocol: amm.protocol,
      startDate: amm.startDateTime,
      endDate: amm.endDateTime,
    };
  }
  return undefined;
    
};

export default mapAmmToAmmTableDatum;

