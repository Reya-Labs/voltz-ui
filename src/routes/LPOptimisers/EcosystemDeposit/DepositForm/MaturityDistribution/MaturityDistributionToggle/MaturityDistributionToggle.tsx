import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';

import { IconLabel } from '../../../../../../components/composite/IconLabel/IconLabel';
import { doNothing } from '../../../../../../utilities/doNothing';
import {
  MaturityDistributionBox,
  MaturityDistributionInputLabel,
  MaturityDistributionTypography,
  ToggleButton,
} from './MaturityDistributionToggle.styled';

type Distribution = 'automatic' | 'manual';

const distributions: {
  label: string;
  id: Distribution;
}[] = [
  {
    id: 'automatic',
    label: 'AUTOMATIC',
  },
  {
    id: 'manual',
    label: 'MANUAL',
  },
];

export type MaturityDistributionToggleProps = {
  distribution: Distribution;
  onChange: (distribution: Distribution) => void;
};
export const MaturityDistributionToggle: React.FunctionComponent<MaturityDistributionToggleProps> =
  ({ distribution, onChange = doNothing }) => {
    return (
      <MaturityDistributionBox>
        <MaturityDistributionInputLabel shrink>
          <IconLabel
            icon="information-circle"
            info="Chose if you want the LP optimiser to optimise the maturity distribution for you or if you would like to customise it yourself."
            label="MATURITY DISTRIBUTION"
          />
        </MaturityDistributionInputLabel>
        <ToggleButtonGroup
          aria-label="text alignment"
          value={distribution}
          exclusive
          onChange={(_, distributionId) => {
            onChange(distributionId as Distribution);
          }}
        >
          {distributions.map((option) => (
            <ToggleButton key={option.id} value={option.id}>
              <MaturityDistributionTypography>{option.label}</MaturityDistributionTypography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </MaturityDistributionBox>
    );
  };
