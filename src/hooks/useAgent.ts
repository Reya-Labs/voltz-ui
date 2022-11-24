import { useContext } from 'react';

import { AgentContext, AgentSettings } from '../contexts';

const useAgent = (): AgentSettings => {
  return useContext(AgentContext);
};

export default useAgent;
