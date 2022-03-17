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
    fixedApr: fixedRate.toNumber(),
  };
};

export default mapAmmToAmmTableDatum;
