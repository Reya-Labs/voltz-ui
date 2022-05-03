import { Position } from '@voltz-protocol/v1-sdk';

import { Agents } from '@components/contexts';
import { PositionTableDatum } from '../types';

const mapPositionToPositionTableDatum =
  (agent: Agents) =>
    ({
      id,
      amm,
      notional,
      effectiveVariableTokenBalance,
      effectiveFixedTokenBalance,
      fixedRateUpper,
      fixedRateLower,
      isSettled,
      source
    }: Position): PositionTableDatum => {
      return {
        source,
        id,
        protocol: amm.protocol,
        startDate: amm.startDateTime,
        endDate: amm.endDateTime,
        fixedApr: 0,
        fixedLower: fixedRateLower.toNumber(),
        fixedUpper: fixedRateUpper.toNumber(),
        notional: agent === Agents.LIQUIDITY_PROVIDER ? notional : (agent === Agents.VARIABLE_TRADER ? effectiveVariableTokenBalance : -effectiveVariableTokenBalance),
        fixedTokenBalance: effectiveFixedTokenBalance,
        agent: agent,
        settled: isSettled
      };
    };

export default mapPositionToPositionTableDatum;
