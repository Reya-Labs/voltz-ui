import { Position } from '@voltz/v1-sdk';

import { Agents } from '@components/contexts';
import { PositionTableDatum } from '../types';

const mapPositionToPositionTableDatum =
  (agent: Agents) =>
  ({
    id,
    amm,
    notional,
    effectiveMargin,
    effectiveVariableTokenBalance,
    effectiveFixedTokenBalance,
    fixedRateUpper, 
    fixedRateLower
  }: Position): PositionTableDatum => {
    return {
      id,
      protocol: amm.protocol,
      startDate: amm.startDateTime,
      endDate: amm.endDateTime,
      fixedApr: amm.fixedRate.toNumber(),
      fixedLower: fixedRateLower.toNumber(),
      fixedUpper: fixedRateUpper.toNumber(),
      notional: agent === Agents.LIQUIDITY_PROVIDER ? notional : (agent === Agents.VARIABLE_TRADER ? effectiveVariableTokenBalance : -effectiveVariableTokenBalance),
      fixedTokenBalance: effectiveFixedTokenBalance,
      margin: effectiveMargin,
    };
  };

export default mapPositionToPositionTableDatum;
