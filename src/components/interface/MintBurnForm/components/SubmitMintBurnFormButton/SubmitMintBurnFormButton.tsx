import React from 'react';

import { Agents } from '@components/contexts';
import { Button } from '@components/atomic';
import { useAgent } from '@hooks';

export type SubmitMintBurnFormButtonProps = {
  onSubmit: () => void;
  liquidityEditMode?: boolean;
};
//The liquidityEditMode boolean is not changing; debug please
const SubmitMintBurnFormButton: React.FunctionComponent<SubmitMintBurnFormButtonProps> = ({ 
  liquidityEditMode,
  onSubmit 
}) => {
  const { agent } = useAgent();
  const submitLabel = (): string | null => {
    switch (agent) {
      case Agents.LIQUIDITY_PROVIDER:
        if (liquidityEditMode) {
        return 'Burn Liquidity';
      } else {
          return 'Provide Liquidity';
        }

      case Agents.FIXED_TRADER:
        return 'Trade Fixed Rate';

      case Agents.VARIABLE_TRADER:
        return 'Trade Variable Rate';

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
