import { useEffect } from 'react';

import { Agents, AgentSettings } from '../contexts/AgentContext/types';
import { useAgent } from './useAgent';

export const useAgentWithOverride = (agentOverride: Agents | undefined): AgentSettings => {
  const { agent, onChangeAgent } = useAgent();

  useEffect(() => {
    if (agentOverride) {
      onChangeAgent(agentOverride);
    }
  }, [agentOverride, onChangeAgent]);

  if (!agentOverride) {
    return { agent, onChangeAgent };
  }

  return {
    agent: agentOverride,
    onChangeAgent,
  };
};
