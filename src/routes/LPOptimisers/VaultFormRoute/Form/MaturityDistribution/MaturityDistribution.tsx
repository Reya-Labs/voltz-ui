import React from 'react';

import {
  AutomaticRolloverToggle,
  AutomaticRolloverToggleProps,
} from '../../../../../components/interface/AutomaticRolloverToggle/AutomaticRolloverToggle';
import { doNothing } from '../../../../../utilities/doNothing';
import {
  MaturityDistributionBox,
  MaturityDistributionErrorTypography,
  MaturityDistributionsBox,
  ToggleBox,
} from './MaturityDistribution.styled';
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
  automaticRolloverStatus?: string;
  automaticRolloverState?: AutomaticRolloverToggleProps['automaticRolloverState'];
  onAutomaticRolloverStateToggle?: AutomaticRolloverToggleProps['onChange'];
};

export const MaturityDistribution: React.FunctionComponent<MaturityDistributionProps> = ({
  distribution,
  onDistributionToggle = doNothing,
  onManualDistributionsUpdate = doNothing,
  weights,
  combinedWeightValue,
  disabledToggle,
  automaticRolloverState,
  onAutomaticRolloverStateToggle,
  automaticRolloverStatus,
}) => {
  const allVaultsWeightEditingDisabled =
    distribution === 'automatic' ? true : weights.every((w) => w.vaultDisabled);

  return (
    <MaturityDistributionBox>
      <ToggleBox>
        {weights.length > 1 && (
          <MaturityDistributionToggle
            disabled={disabledToggle}
            distribution={distribution}
            onChange={onDistributionToggle}
          />
        )}
        {automaticRolloverStatus && onAutomaticRolloverStateToggle && automaticRolloverState && (
          <AutomaticRolloverToggle
            automaticRolloverState={automaticRolloverState}
            disabled={disabledToggle}
            showTooltip={true}
            transactionStatus={automaticRolloverStatus}
            onChange={onAutomaticRolloverStateToggle}
          />
        )}
      </ToggleBox>
      <MaturityDistributionHeader />
      <MaturityDistributionsBox>
        {weights.map((weight, index) => (
          <MaturityDistributionEntry
            key={`${index}-${distribution}`}
            disabled={distribution === 'automatic' || weights[index].vaultDisabled}
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
      {distribution === 'manual' &&
      !allVaultsWeightEditingDisabled &&
      combinedWeightValue !== 100 ? (
        <MaturityDistributionErrorTypography>
          The total distribution is {combinedWeightValue}%, it has to be 100%.
        </MaturityDistributionErrorTypography>
      ) : null}
    </MaturityDistributionBox>
  );
};
