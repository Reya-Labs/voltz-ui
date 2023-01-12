import isUndefined from 'lodash.isundefined';

import { Agents } from '../../../contexts/AgentContext/types';

/**
 * It takes a position type and returns the agent type
 * @param positionType The position type
 * @returns The agent type
 */
export const getAgentFromPosition = (positionType?: number) => {
  if (isUndefined(positionType)) return;
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
