import React from 'react';

import { doNothing } from '../../../../../utilities/doNothing';
import {
  MaturityDistributionErrorTypography,
  MaturityDistributionsBox,
} from '../DepositForm.styled';
import { MaturityDistributionBox } from './MaturityDistribution.styled';
import { MaturityDistributionEntry } from './MaturityDistributionEntry/MaturityDistributionEntry';
import { MaturityDistributionHeader } from './MaturityDistributionHeader/MaturityDistributionHeader';
import {
  MaturityDistributionToggle,
  MaturityDistributionToggleProps,
} from './MaturityDistributionToggle/MaturityDistributionToggle';

type Weight = {
  distribution: number;
  maturityTimestamp: number;
  pools: string[];
  vaultDisabled: boolean;
};

export type MaturityDistributionProps = {
  distribution: MaturityDistributionToggleProps['distribution'];
  onDistributionToggle: MaturityDistributionToggleProps['onChange'];
  onManualDistributionsUpdate: (newManualWeights: Weight[]) => void;
  weights: Weight[];
  combinedWeightValue: number;
  disabledToggle: boolean;
};

export const MaturityDistribution: React.FunctionComponent<MaturityDistributionProps> = ({
  distribution,
  onDistributionToggle = doNothing,
  onManualDistributionsUpdate = doNothing,
  weights,
  combinedWeightValue,
  disabledToggle,
}) => (
  <MaturityDistributionBox>
    {weights.length > 1 && (
      <MaturityDistributionToggle
        disabled={disabledToggle}
        distribution={distribution}
        onChange={onDistributionToggle}
      />
    )}
    <MaturityDistributionHeader />
    <MaturityDistributionsBox>
      {weights.map((weight, index) => (
        <MaturityDistributionEntry
          key={`${index}-${distribution}`}
          disabled={distribution === 'automatic'}
          onChange={(newDistribution) => {
            if (distribution === 'automatic') {
              return;
            }
            const weightCopies = weights.map((m) => ({ ...m }));
            weightCopies[index].distribution = newDistribution;
            onManualDistributionsUpdate(weightCopies);
          }}
          {...weight}
        />
      ))}
    </MaturityDistributionsBox>
    {combinedWeightValue !== 100 ? (
      <MaturityDistributionErrorTypography>
        The total distribution is now {combinedWeightValue}%, it has to be 100%.
      </MaturityDistributionErrorTypography>
    ) : null}
  </MaturityDistributionBox>
);
