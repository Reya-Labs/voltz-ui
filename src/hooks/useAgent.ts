import { useContext } from 'react';

import { AgentSettings } from '../contexts/AgentContext/types';
import { AgentContext } from '../contexts/AgentContext/AgentContext';

export const useAgent = (): AgentSettings => {
  return useContext(AgentContext);
};
