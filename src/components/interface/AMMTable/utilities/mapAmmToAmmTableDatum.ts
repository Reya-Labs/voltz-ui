import { AugmentedAMM, isBorrowing } from '@utilities';
import { AMMTableDatum } from '../types';

const mapAmmToAmmTableDatum = ({
  id,
  protocol,
  startDateTime,
  endDateTime,
  rateOracle,
}: AugmentedAMM): AMMTableDatum => {
  return {
    id,
    protocol,
    startDate: startDateTime,
    endDate: endDateTime,
    isBorrowing: isBorrowing(rateOracle.protocolId),
  };
};

export default mapAmmToAmmTableDatum;

