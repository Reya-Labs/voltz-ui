import { Agents } from '@contexts';
import { Position } from '@voltz-protocol/v1-sdk';

/**
 * It takes a position and returns the agent type
 * @param {Position} [position] - Position - the position object that you want to get the agent from
 * @returns The agent type
 */
export const getAgentFromPosition = (position?: Position) => {
  if (!position) return;
  const positionType = position.positionType;
  let agent: Agents;
  switch (positionType) {
    case 1:
      agent = Agents.FIXED_TRADER;
      break;
    case 2:
      agent = Agents.VARIABLE_TRADER;
      break;
    case 3:
      agent = Agents.LIQUIDITY_PROVIDER;
      break;
    default:
      agent = Agents.LIQUIDITY_PROVIDER;
  }
  return agent;
};
