import { CurrencyField, Typography, TypographyWithTooltip } from 'brokoli-ui';
import { DateTime } from 'luxon';
import React, { useState } from 'react';

import { doNothing } from '../../../../../../utilities/doNothing';
import {
  DistributionBox,
  InputBox,
  MaturityBox,
  MaturityDistributionBox,
  PoolBox,
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
  const notCompleted = maturityTimestamp > Date.now().valueOf();
  return (
    <MaturityDistributionBox>
      <DistributionBox>
        <InputBox>
          <CurrencyField
            allowNegativeValue={false}
            disabled={disabled}
            max="100"
            min="0"
            suffix="%"
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
            onChange={(nextValue) => {
              if (!nextValue) {
                return;
              }
              setValue(nextValue);
            }}
          />
        </InputBox>
      </DistributionBox>
      <MaturityBox>
        <Typography
          colorToken={notCompleted ? 'lavenderWeb' : 'skyBlueCrayola'}
          typographyToken="primaryBodySmallRegular"
        >
          {notCompleted
            ? DateTime.fromMillis(maturityTimestamp).toFormat('dd LLL yyyy')
            : 'Completed'}
        </Typography>
      </MaturityBox>
      <PoolBox>
        {poolsCount !== 0 ? (
          <TypographyWithTooltip
            colorToken="lavenderWeb"
            tooltip={
              <>
                {poolsCount} Pools sharing the same maturity:
                <PoolList>
                  {pools.map((p, index) => (
                    <li key={index}>{p}</li>
                  ))}
                </PoolList>
              </>
            }
            typographyToken="primaryBodySmallRegular"
          >
            {`${poolsCount} POOL${poolsCount > 1 ? 'S' : ''}`}
          </TypographyWithTooltip>
        ) : null}
      </PoolBox>
    </MaturityDistributionBox>
  );
};
