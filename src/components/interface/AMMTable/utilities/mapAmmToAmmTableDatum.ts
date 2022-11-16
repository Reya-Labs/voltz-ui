import { isBorrowing } from '@utilities';
import { AMMTableDatum } from '../types';

import { AMM } from '@voltz-protocol/v1-sdk';

const mapAmmToAmmTableDatum = ({
  id,
  protocol,
  startDateTime,
  endDateTime,
  rateOracle,
}: AMM): AMMTableDatum => {
  return {
    id,
    protocol,
    startDate: startDateTime,
    endDate: endDateTime,
    isBorrowing: isBorrowing(rateOracle.protocolId),
  };
};

export default mapAmmToAmmTableDatum;
