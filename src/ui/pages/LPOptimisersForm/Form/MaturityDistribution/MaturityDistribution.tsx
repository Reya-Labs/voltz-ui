import { closeOrPastMaturity } from '@voltz-protocol/v1-sdk';
import { Typography } from 'brokoli-ui';
import React from 'react';

import { doNothing } from '../../../../../utilities/doNothing';
import {
  AutomaticRolloverToggle,
  AutomaticRolloverToggleProps,
} from '../../../../components/AutomaticRolloverToggle';
import {
  MaturityDistributionBox,
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
  canRegisterUnregister: boolean;
  distribution: MaturityDistributionToggleProps['distribution'];
  onDistributionToggle: MaturityDistributionToggleProps['onChange'];
  onManualDistributionsUpdate: (newManualWeights: Weight[]) => void;
  weights: Weight[];
  combinedWeightValue: number;
  disabledToggle: boolean;
  isVaultRegisteredForAutoRollover: boolean;
  automaticRolloverGasCost?: number;
  automaticRolloverState?: AutomaticRolloverToggleProps['automaticRolloverState'];
  automaticRolloverChangePromise?: AutomaticRolloverToggleProps['onChangePromise'];
};

export const MaturityDistribution: React.FunctionComponent<MaturityDistributionProps> = ({
  canRegisterUnregister,
  distribution,
  onDistributionToggle = doNothing,
  onManualDistributionsUpdate = doNothing,
  weights,
  combinedWeightValue,
  disabledToggle,
  automaticRolloverState,
  automaticRolloverChangePromise,
  automaticRolloverGasCost,
  isVaultRegisteredForAutoRollover,
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
        {automaticRolloverGasCost !== undefined &&
          automaticRolloverChangePromise &&
          automaticRolloverState && (
            <AutomaticRolloverToggle
              automaticRolloverState={automaticRolloverState}
              canRegisterUnregister={canRegisterUnregister}
              disabled={disabledToggle}
              gasCost={automaticRolloverGasCost}
              isVaultRegisteredForAutoRollover={isVaultRegisteredForAutoRollover}
              showTooltip={true}
              triggersOnChainTransaction={false}
              onChangePromise={automaticRolloverChangePromise}
            />
          )}
      </ToggleBox>
      <MaturityDistributionHeader />
      <MaturityDistributionsBox>
        {weights.map((weight, index) => {
          if (closeOrPastMaturity(weight.maturityTimestamp)) {
            // can't replace this with filter because it screws up index
            return null;
          }

          return (
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
          );
        })}
      </MaturityDistributionsBox>
      {distribution === 'manual' &&
      !allVaultsWeightEditingDisabled &&
      combinedWeightValue !== 100 ? (
        <Typography colorToken="error100" typographyToken="primaryBodySmallRegular">
          The total distribution is {combinedWeightValue}%, it has to be 100%.
        </Typography>
      ) : null}
    </MaturityDistributionBox>
  );
};
