import { Position, PositionInfo } from "@voltz-protocol/v1-sdk";
import { isUndefined } from "lodash";
import { Agents } from '@contexts';

/**
 * Returns the health counts for the given set of positions
 * @param positions - The array of positions shown in the portfolio
 * @param positionInfo - The position info object
 */
export const getHealthCounters = (positions: Position[], positionInfo: Record<Position['id'], PositionInfo>) => {
  let healthy = 0;
  let warning = 0;
  let danger = 0;

  positions.forEach(position => {
    const healthFactor = positionInfo[position.id]?.healthFactor;
    if (!isUndefined(healthFactor)) {
      if (healthFactor === 1) danger += 1;
      if (healthFactor === 2) warning += 1;
      if (healthFactor === 3) healthy += 1;
    }
  });

  return { healthy, warning, danger };
}

/**
 * Returns the total net paying rate figure for the given set of positions
 * @param positions - The array of positions shown in the portfolio
 * @param positionInfo - The position info object
 * @param agent - The current agent
 */
export const getNetPayingRate = (positions: Position[], positionInfo: Record<Position['id'], PositionInfo>, agent: Agents) => {
  let netPayingRate = 0;
  let totalNotional = 0;

  positions.forEach(position => {
    const info = positionInfo[position.id];
  
    if (info) {
      const fixedRate = info.fixedRateSinceLastSwap;
      const variableRate = info.variableRateSinceLastSwap;

      if(!isUndefined(fixedRate) && position.positionType !== 1) {
        netPayingRate += fixedRate * Math.abs(position.effectiveVariableTokenBalance);
        totalNotional += Math.abs(position.effectiveVariableTokenBalance);
      }

      if(!isUndefined(variableRate) && position.positionType === 1) {
        netPayingRate += variableRate * Math.abs(position.effectiveVariableTokenBalance);
        totalNotional += Math.abs(position.effectiveVariableTokenBalance);
      }
    }
  })

  if (agent !== Agents.LIQUIDITY_PROVIDER) {
    if (totalNotional > 0) {
      netPayingRate /= totalNotional;
    }
  }

  return netPayingRate;
}

/**
 * Returns the total net receiving rate figure for the given set of positions
 * @param positions - The array of positions shown in the portfolio
 * @param positionInfo - The position info object
 * @param agent - The current agent
 */
export const getNetReceivingRate = (positions: Position[], positionInfo: Record<Position['id'], PositionInfo>, agent: Agents) => {
  let netReceivingRate = 0;
  let totalNotional = 0;

  positions.forEach(position => {
    const info = positionInfo[position.id];
  
    if (info) {
      const fixedRate = info.fixedRateSinceLastSwap;
      const variableRate = info.variableRateSinceLastSwap;

      if(!isUndefined(fixedRate) && position.positionType === 1) {
        netReceivingRate += fixedRate * Math.abs(position.effectiveVariableTokenBalance);
        totalNotional += Math.abs(position.effectiveVariableTokenBalance);
      }

      if(!isUndefined(variableRate) && position.positionType !== 1) {
        netReceivingRate += variableRate * Math.abs(position.effectiveVariableTokenBalance);
        totalNotional += Math.abs(position.effectiveVariableTokenBalance);
      }
    }
  })

  if (agent !== Agents.LIQUIDITY_PROVIDER) {
    if (totalNotional > 0) {
      netReceivingRate /= totalNotional;
    }
  }

  return netReceivingRate;
}

/**
 * Returns the total accrued cashflow figure for the given set of positions
 * @param positions - The array of positions shown in the portfolio
 * @param positionInfo - The position info object
 */
export const getTotalAccruedCashflow = (positions: Position[], positionInfo: Record<Position['id'], PositionInfo>) => {
  return positions.reduce((runningTotal, position) => runningTotal + positionInfo[position.id]?.accruedCashflowInUSD || 0, 0);
}

/**
 * Returns the total margin figure for the given set of positions
 * @param positions - The array of positions shown in the portfolio
 * @param positionInfo - The position info object
 */
export const getTotalMargin = (positions: Position[], positionInfo: Record<Position['id'], PositionInfo>) => {
  return positions.reduce((runningTotal, position) => runningTotal + positionInfo[position.id]?.marginInUSD || 0, 0);
}

/**
 * Returns the total notional figure for the given positions
 * @param positions - The array of positions shown in the portfolio
 * @param agent - The current agent
 */
export const getTotalNotional = (positions: Position[], positionInfo: Record<Position['id'], PositionInfo>) => {
  return positions.reduce((runningTotal, position) => runningTotal + positionInfo[position.id]?.notionalInUSD || 0, 0);
}
