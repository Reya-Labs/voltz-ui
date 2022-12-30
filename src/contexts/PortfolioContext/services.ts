import { Position } from '@voltz-protocol/v1-sdk';
import isUndefined from 'lodash.isundefined';

import { Agents } from '../../contexts/AgentContext/types';

/**
 * Returns the health counts for the given set of positions
 * @param positions - The array of positions shown in the portfolio
 */
export const getHealthCounters = (
  positions: Position[],
) => {
  let healthy = 0;
  let warning = 0;
  let danger = 0;

  positions.forEach((position) => {
    const healthFactor = position?.healthFactor;
    if (!isUndefined(healthFactor)) {
      if (healthFactor === 1) danger += 1;
      if (healthFactor === 2) warning += 1;
      if (healthFactor === 3) healthy += 1;
    }
  });

  return { healthy, warning, danger };
};

/**
 * Returns the total net paying rate figure for the given set of positions
 * @param positions - The array of positions shown in the portfolio
 * @param agent - The current agent
 */
export const getNetPayingRate = (
  positions: Position[],
  agent: Agents,
) => {
  let netPayingRate = 0;
  let totalNotional = 0;

  positions.forEach((position) => {
    netPayingRate += position.payingRate * Math.abs(position.variableTokenBalance);
    totalNotional += Math.abs(position.variableTokenBalance);
  });

  if (agent !== Agents.LIQUIDITY_PROVIDER) {
    if (totalNotional > 0) {
      netPayingRate /= totalNotional;
    }
  }

  return netPayingRate;
};

/**
 * Returns the total net receiving rate figure for the given set of positions
 * @param positions - The array of positions shown in the portfolio
 * @param agent - The current agent
 */
export const getNetReceivingRate = (
  positions: Position[],
  agent: Agents,
) => {
  let netReceivingRate = 0;
  let totalNotional = 0;

  positions.forEach((position) => {
    netReceivingRate += position.receivingRate * Math.abs(position.variableTokenBalance);
    totalNotional += Math.abs(position.variableTokenBalance);
  });

  if (agent !== Agents.LIQUIDITY_PROVIDER) {
    if (totalNotional > 0) {
      netReceivingRate /= totalNotional;
    }
  }

  return netReceivingRate;
};

/**
 * Returns the total accrued cashflow figure for the given set of positions
 * @param positions - The array of positions shown in the portfolio
 */
export const getTotalAccruedCashflow = (
  positions: Position[],
) => {
  return positions.reduce(
    (runningTotal, position) => runningTotal + position.accruedCashflowInUSD,
    0,
  );
};

/**
 * Returns the total margin figure for the given set of positions
 * @param positions - The array of positions shown in the portfolio
 */
export const getTotalMargin = (
  positions: Position[],
) => {
  return positions.reduce(
    (runningTotal, position) => runningTotal + position.marginInUSD,
    0,
  );
};

/**
 * Returns the total notional figure for the given positions
 * @param positions - The array of positions shown in the portfolio
 */
export const getTotalNotional = (
  positions: Position[],
) => {
  return positions.reduce(
    (runningTotal, position) => runningTotal + position.notionalInUSD,
    0,
  );
};
