import React from 'react';

import { doNothing } from '../../../../../utilities/doNothing';
import { MaturityDistributionsBox } from '../DepositForm.styled';
import { MaturityDistributionBox } from './MaturityDistribution.styled';
import { MaturityDistributionEntry } from './MaturityDistributionEntry/MaturityDistributionEntry';
import { MaturityDistributionHeader } from './MaturityDistributionHeader/MaturityDistributionHeader';
import {
  MaturityDistributionToggle,
  MaturityDistributionToggleProps,
} from './MaturityDistributionToggle/MaturityDistributionToggle';

export type MaturityDistributionProps = {
  distribution: MaturityDistributionToggleProps['distribution'];
  onChangeDistribution: MaturityDistributionToggleProps['onChange'];
  weights: {
    distribution: number;
    maturityTimestamp: number;
    pools: string[];
  }[];
};

export const MaturityDistribution: React.FunctionComponent<MaturityDistributionProps> = ({
  distribution,
  onChangeDistribution = doNothing,
  weights,
}) => (
  <MaturityDistributionBox>
    <MaturityDistributionToggle distribution={distribution} onChange={onChangeDistribution} />
    <MaturityDistributionHeader />
    <MaturityDistributionsBox>
      {weights.map((weight, index) => (
        <MaturityDistributionEntry
          key={index}
          disabled={distribution === 'automatic'}
          onChange={doNothing}
          {...weight}
        />
      ))}
    </MaturityDistributionsBox>
  </MaturityDistributionBox>
);
