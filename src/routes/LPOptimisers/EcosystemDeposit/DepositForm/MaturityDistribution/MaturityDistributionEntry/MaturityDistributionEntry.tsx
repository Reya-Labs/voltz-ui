import React, { useState } from 'react';

import { IconLabel } from '../../../../../../components/composite/IconLabel/IconLabel';
import { formatPOSIXTimestamp } from '../../../../../../utilities/date';
import { doNothing } from '../../../../../../utilities/doNothing';
import {
  DistributionInput,
  DistributionInputWrapper,
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
  onChange = doNothing,
  disabled,
  maturityTimestamp,
  pools,
}) => {
  const poolsCount = pools.length;
  const [value, setValue] = useState(distribution.toString());
  const handleOnBlur = (nextValue: number) => {
    onChange(nextValue);
    setValue(nextValue.toString());
  };
  return (
    <MaturityDistributionBox>
      <EvenBox>
        <DistributionInputWrapper>
          <DistributionInput
            disabled={disabled}
            max="100"
            min="0"
            type="number"
            value={value}
            onBlur={() => {
              const valueParsed = parseInt(value, 10);
              if (isNaN(valueParsed)) {
                handleOnBlur(0);
                return;
              }
              if (valueParsed < 0 || valueParsed > 100) {
                handleOnBlur(distribution);
                return;
              }
              handleOnBlur(valueParsed);
            }}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        </DistributionInputWrapper>
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
