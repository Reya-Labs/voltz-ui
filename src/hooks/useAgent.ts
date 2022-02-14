import { useContext } from 'react';

import { AgentContext, AgentSettings } from '@components/contexts';

const useAgent = (): AgentSettings => {
  return useContext(AgentContext);
};

export default useAgent;
