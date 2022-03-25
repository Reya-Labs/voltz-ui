import { Position } from '@voltz/v1-sdk';

import { PositionTableDatum } from '../types';

const mapPositionToPositionTableDatum = ({
  id,
  amm,
  effectiveMargin,
  effectiveVariableTokenBalance,
}: Position): PositionTableDatum => {
  return {
    id,
    protocol: amm.protocol,
    startDate: amm.startDateTime,
    endDate: amm.endDateTime,
    fixedApr: amm.fixedRate.toNumber(),
    notional: effectiveVariableTokenBalance,
    margin: effectiveMargin,
  };
};

export default mapPositionToPositionTableDatum;
