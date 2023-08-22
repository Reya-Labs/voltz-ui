import { PillSelector } from 'brokoli-ui';
import React from 'react';

import { doNothing } from '../../../../../../utilities/doNothing';

type Distribution = 'automatic' | 'manual';

const distributions: {
  label: string;
  id: Distribution;
}[] = [
  {
    id: 'automatic',
    label: 'Automatic',
  },
  {
    id: 'manual',
    label: 'Manual',
  },
];

export type MaturityDistributionToggleProps = {
  distribution: Distribution;
  onChange: (distribution: Distribution) => void;
  disabled: boolean;
};
export const MaturityDistributionToggle: React.FunctionComponent<
  MaturityDistributionToggleProps
> = ({ disabled, distribution, onChange = doNothing }) => {
  return (
    <PillSelector
      activePillId={distribution as string}
      disabled={disabled}
      label="Maturity Distribution"
      pillOptions={distributions}
      tooltip="Choose if you want the LP optimiser to optimise the maturity distribution for you or if you would like to customise it yourself."
      variant="compact"
      onPillClick={(distributionId) => {
        if (!distributionId) {
          return;
        }
        onChange(distributionId as Distribution);
      }}
    />
  );
};
