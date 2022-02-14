import React, { useState } from 'react';

import { Agents } from './types';
import AgentContext from './AgentContext';

const AgentProvider: React.FunctionComponent = ({ children }) => {
  const [agent, setAgent] = useState<Agents>(Agents.FIXED_TRADER);
  const value = {
    agent,
    onChangeAgent: setAgent,
  };

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
};

export default AgentProvider;
