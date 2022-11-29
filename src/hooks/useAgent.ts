import { useContext } from 'react';

import { AgentContext } from '../contexts/AgentContext/AgentContext';
import { AgentSettings } from '../contexts/AgentContext/types';

export const useAgent = (): AgentSettings => {
  return useContext(AgentContext);
};
