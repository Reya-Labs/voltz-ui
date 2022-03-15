import React from 'react';

import { Agents } from '@components/contexts';
import { Button } from '@components/atomic';
import { useAgent } from '@hooks';

export type SubmitMintBurnFormButtonProps = {
  onSubmit: () => void;
};

const SubmitMintBurnFormButton: React.FunctionComponent<SubmitMintBurnFormButtonProps> = ({ onSubmit }) => {
  const { agent } = useAgent();
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
    <Button size="large" onClick={onSubmit}>
      {submitLabel()}
    </Button>
  );
};

export default SubmitMintBurnFormButton;
