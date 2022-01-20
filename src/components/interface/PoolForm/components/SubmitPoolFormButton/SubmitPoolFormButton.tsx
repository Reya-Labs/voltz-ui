import React from 'react';

import { Agents, VzMode } from '@theme';
import { Button } from '@components/atomic';

export type SubmitPoolFormButtonProps = VzMode & {
  onSubmit: () => void;
};

const SubmitPoolFormButton: React.FunctionComponent<SubmitPoolFormButtonProps> = ({
  mode,
  onSubmit,
}) => {
  const submitLabel = (): string | null => {
    switch (mode) {
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

  return <Button onClick={onSubmit}>{submitLabel()}</Button>;
};

export default SubmitPoolFormButton;
