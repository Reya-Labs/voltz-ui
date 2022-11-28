import React, { useState } from 'react';

import { Agents } from './types';
import { AgentContext } from './AgentContext';

type AgentProviderProps = {
  defaultAgent?: Agents;
};

export const AgentProvider: React.FunctionComponent<AgentProviderProps> = ({
  children,
  defaultAgent,
}) => {
  const [agent, setAgent] = useState<Agents>(defaultAgent || Agents.FIXED_TRADER);
  const value = {
    agent,
    onChangeAgent: setAgent,
  };

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
};
