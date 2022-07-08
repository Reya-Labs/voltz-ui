import { Position } from '@voltz-protocol/v1-sdk';

import { Agents } from '@contexts';
import { isUndefined } from 'lodash';

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
      source,
      averageFixedRate
    }: Position) => {
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
        settled: isSettled,
        averageFixedRate: isUndefined(averageFixedRate) ? "-" : (averageFixedRate.toFixed(2) + "%"),
      };
    };

export default mapPositionToPositionTableDatum;
