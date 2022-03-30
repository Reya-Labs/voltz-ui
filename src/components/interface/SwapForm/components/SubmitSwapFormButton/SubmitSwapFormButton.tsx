import React from 'react';

import { Agents } from '@components/contexts';
import { Button } from '@components/atomic';
import { useAgent } from '@hooks';

export type SubmitSwapFormButtonProps = {
  onSubmit: () => void;
};

const SubmitSwapFormButton: React.FunctionComponent<SubmitSwapFormButtonProps> = ({ onSubmit }) => {
  const { agent } = useAgent();
  const submitLabel = (): string | null => {
    switch (agent) {
      case Agents.FIXED_TRADER:
        return 'Take that fixed rate';

      case Agents.VARIABLE_TRADER:
        return 'Take that variable rate';

      default:
        return null;
    }
  };

  return (
    <Button size="large" onClick={onSubmit}>
      {submitLabel()}
    </Button>
  );
};

export default SubmitSwapFormButton;
