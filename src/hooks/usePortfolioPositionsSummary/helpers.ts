import { HealthFactorStatus } from '@voltz-protocol/v1-sdk';

import { Agents } from '../../contexts/AgentContext/types';

/**
 * Returns the health counts for the given set of positions
 * @param positions - The array of positions shown in the portfolio
 */
export const getHealthCounters = (
  positions: {
    healthFactor: HealthFactorStatus;
  }[],
) => {
  let healthy = 0;
  let warning = 0;
  let danger = 0;
  positions.forEach((position) => {
    const healthFactor = position.healthFactor;
    if (healthFactor === HealthFactorStatus.DANGER) danger += 1;
    if (healthFactor === HealthFactorStatus.WARNING) warning += 1;
    if (healthFactor === HealthFactorStatus.HEALTHY) healthy += 1;
  });

  return { healthy, warning, danger };
};

/**
 * Returns the total net paying rate figure for the given set of positions
 * @param positions - The array of positions shown in the portfolio
 * @param agent - The current agent
 */
export const getNetPayingRate = (
  positions: {
    payingRate: number;
    notionalInUSD: number;
  }[],
  agent: Agents,
): number => {
  if (agent === Agents.LIQUIDITY_PROVIDER) {
    return 0;
  }

  let netPayingRate = 0;
  let totalNotional = 0;

  positions.forEach((position) => {
    netPayingRate += position.payingRate * position.notionalInUSD;
    totalNotional += position.notionalInUSD;
  });

  if (totalNotional > 0) {
    return netPayingRate / totalNotional;
  }

  return 0;
};

/**
 * Returns the total net receiving rate figure for the given set of positions
 * @param positions - The array of positions shown in the portfolio
 * @param agent - The current agent
 */
export const getNetReceivingRate = (
  positions: {
    receivingRate: number;
    notionalInUSD: number;
  }[],
  agent: Agents,
): number => {
  if (agent === Agents.LIQUIDITY_PROVIDER) {
    return 0;
  }

  let netReceivingRate = 0;
  let totalNotional = 0;

  positions.forEach((position) => {
    netReceivingRate += position.receivingRate * position.notionalInUSD;
    totalNotional += position.notionalInUSD;
  });

  if (totalNotional > 0) {
    return netReceivingRate / totalNotional;
  }

  return 0;
};

/**
 * Returns the total accrued cashflow figure for the given set of positions
 * @param positions - The array of positions shown in the portfolio
 */
export const getTotalAccruedCashflow = (
  positions: {
    accruedCashflowInUSD: number;
  }[],
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
  positions: {
    marginInUSD: number;
  }[],
) => {
  return positions.reduce((runningTotal, position) => runningTotal + position.marginInUSD, 0);
};

/**
 * Returns the total notional figure for the given positions
 * @param positions - The array of positions shown in the portfolio
 */
export const getTotalNotional = (
  positions: {
    notionalInUSD: number;
  }[],
) => {
  return positions.reduce((runningTotal, position) => runningTotal + position.notionalInUSD, 0);
};
