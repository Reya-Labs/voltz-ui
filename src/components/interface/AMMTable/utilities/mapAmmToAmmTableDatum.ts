import { AMM } from '@voltz/v1-sdk';

import { AMMTableDatum } from '../types';

const mapAmmToAmmTableDatum = ({
  id,
  protocol,
  startDateTime,
  endDateTime,
  fixedRate,
}: AMM): AMMTableDatum => {
  return {
    id,
    protocol,
    startDate: startDateTime,
    endDate: endDateTime,
    // fixedApr: parseFloat(fixedRate.toFixed(2)), // todo: fix type
    fixedApr: 15,
    variableApr: 5,
  };
};

export default mapAmmToAmmTableDatum;
