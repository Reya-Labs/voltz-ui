import React, { useState } from 'react';

import { Agents } from './types';
import AgentContext from './AgentContext';


// ab notes
// this will globally set the agent for the entire UI, once the agent changes, then all of the colours for all the interface elements change
// all of the components on the interface that are rendered will change to use the colours of the agent
const AgentProvider: React.FunctionComponent = ({ children }) => {
  const [agent, setAgent] = useState<Agents>(Agents.FIXED_TRADER);
  const value = {
    agent,
    onChangeAgent: setAgent,
  };

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
};

export default AgentProvider;
