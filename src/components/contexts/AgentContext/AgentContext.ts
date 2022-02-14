import { createContext } from 'react';

import { Agents, AgentSettings } from './types';

const defaultChangeAgent = (_agent: Agents) => null;

const AgentContext = createContext<AgentSettings>({
  agent: Agents.FIXED_TRADER,
  onChangeAgent: defaultChangeAgent,
});

export default AgentContext;
