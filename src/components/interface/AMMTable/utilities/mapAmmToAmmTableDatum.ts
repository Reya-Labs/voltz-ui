import { AugmentedAMM } from '@utilities';
import { AMMTableDatum } from '../types';

const mapAmmToAmmTableDatum = ({
  id,
  protocol,
  startDateTime,
  endDateTime,
}: AugmentedAMM): AMMTableDatum => {
  return {
    id,
    protocol,
    startDate: startDateTime,
    endDate: endDateTime,
  };
};

export default mapAmmToAmmTableDatum;

