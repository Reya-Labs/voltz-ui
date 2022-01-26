import React from 'react';

import { Agents, AgentProps } from '@theme';
import { Button } from '@components/atomic';

export type SubmitPoolFormButtonProps = AgentProps & {
  onSubmit: () => void;
};

const SubmitPoolFormButton: React.FunctionComponent<SubmitPoolFormButtonProps> = ({
  agent,
  onSubmit,
}) => {
  const submitLabel = (): string | null => {
    switch (agent) {
      case Agents.LIQUIDITY_PROVIDER:
        return 'Provide Liquidity';

      case Agents.FIXED_TRADER:
        return 'Take that fixed rate';

      case Agents.VARIABLE_TRADER:
        return 'Take that variable rate';

      default:
        return null;
    }
  };

  return (
    <Button size="large" onClick={onSubmit} agent={agent}>
      {submitLabel()}
    </Button>
  );
};

export default SubmitPoolFormButton;
