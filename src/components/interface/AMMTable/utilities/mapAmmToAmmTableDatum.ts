import { AugmentedAMM } from '@utilities';
import { AMMTableDatum } from '../types';

const mapAmmToAmmTableDatum = ({
  id,
  protocol,
  startDateTime,
  endDateTime,
  fixedRate,
}: AugmentedAMM): AMMTableDatum => {
  return {
    id,
    protocol,
    startDate: startDateTime,
    endDate: endDateTime,
    fixedApr: fixedRate.toNumber(),
  };
};

export default mapAmmToAmmTableDatum;
