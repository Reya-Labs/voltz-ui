import { AgentSettings } from '@components/contexts';
import useAgent from './useAgent';

const useAgentWithOverride = (args: AgentSettings | undefined): AgentSettings => {
  const { agent, onChangeAgent } = useAgent();

  if (!args) {
    return { agent, onChangeAgent };
  }

  return args;
};

export default useAgentWithOverride;
