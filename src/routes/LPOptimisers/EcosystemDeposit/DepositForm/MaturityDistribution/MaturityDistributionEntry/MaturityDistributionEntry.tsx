import React from 'react';

import { IconLabel } from '../../../../../../components/composite/IconLabel/IconLabel';
import { formatPOSIXTimestamp } from '../../../../../../utilities/date';
import {
  DistributionInput,
  DistributionInputWrapper,
  DistributionTypography,
  EvenBox,
  MaturityDistributionBox,
  MaturityTypography,
  PoolInputLabel,
  PoolList,
} from './MaturityDistributionEntry.styled';
type MaturityDistributionEntryProps = {
  distribution: number;
  onChange: (value: number) => void;
  maturityTimestamp: number;
  pools: string[];
  disabled: boolean;
};
export const MaturityDistributionEntry: React.FunctionComponent<MaturityDistributionEntryProps> = ({
  distribution,
  onChange,
  disabled,
  maturityTimestamp,
  pools,
}) => {
  const poolsCount = pools.length;
  return (
    <MaturityDistributionBox>
      <EvenBox>
        {disabled ? (
          <DistributionTypography>{distribution} %</DistributionTypography>
        ) : (
          <DistributionInputWrapper>
            <DistributionInput
              max="100"
              min="0"
              type="number"
              value={distribution}
              onChange={(event) => {
                const value = parseInt(event.target.value, 10);
                if (isNaN(value) || value < 0 || value > 100) {
                  return;
                }
              }}
            />
          </DistributionInputWrapper>
        )}
      </EvenBox>
      <EvenBox>
        <MaturityTypography>{formatPOSIXTimestamp(maturityTimestamp)}</MaturityTypography>
      </EvenBox>
      <EvenBox>
        {poolsCount !== 0 ? (
          <PoolInputLabel shrink>
            <IconLabel
              icon="information-circle"
              info={
                <>
                  {poolsCount} Pools sharing the same maturity:
                  <PoolList>
                    {pools.map((p, index) => (
                      <li key={index}>{p}</li>
                    ))}
                  </PoolList>
                </>
              }
              label={`${poolsCount} POOL${poolsCount > 1 ? 'S' : ''}`}
            />
          </PoolInputLabel>
        ) : null}
      </EvenBox>
    </MaturityDistributionBox>
  );
};
