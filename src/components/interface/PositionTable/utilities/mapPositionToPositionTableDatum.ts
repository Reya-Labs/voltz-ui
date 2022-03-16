import { Position } from '@voltz/v1-sdk';

import { PositionTableDatum } from '../types';

const mapPositionToPositionTableDatum = ({
  id,
  amm,
  notional,
  effectiveMargin,
}: Position): PositionTableDatum => {
  return {
    id,
    protocol: amm.protocol,
    startDate: amm.startDateTime,
    endDate: amm.endDateTime,
    fixedApr: amm.fixedRate.toNumber(),
    notional: notional,
    margin: effectiveMargin,
  };
};

export default mapPositionToPositionTableDatum;
