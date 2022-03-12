import JSBI from 'jsbi';
import { Position } from '@voltz/v1-sdk';

import { PositionTableDatum } from '../types';

const mapPositionToPositionTableDatum = ({
  id,
  amm,
  liquidity,
  margin,
}: Position): PositionTableDatum => {
  return {
    id,
    protocol: amm.protocol,
    startDate: amm.startDateTime,
    endDate: amm.endDateTime,
    fixedApr: JSBI.toNumber(JSBI.BigInt(amm.fixedRate.toFixed(2))),
    notional: JSBI.toNumber(liquidity),
    margin: JSBI.toNumber(margin),
  };
};

export default mapPositionToPositionTableDatum;
