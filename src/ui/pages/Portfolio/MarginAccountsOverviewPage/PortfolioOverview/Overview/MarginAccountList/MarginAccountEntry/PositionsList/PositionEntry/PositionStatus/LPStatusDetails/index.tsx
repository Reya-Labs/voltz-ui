import { HorizontalLine, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { formFormatNumber } from '../../../../../../../../../../../../app/features/forms/common';
import { InRange } from '../InRange';
import { OutOfRange } from '../OutOfRange';
import { LPStatusDetailsBox, RowBox, RowsBox } from './LPStatusDetails.styled';

export type LPStatusDetailsProps = {
  currentFixed: number;
  fixLow: number;
  fixHigh: number;
};

export const LPStatusDetails: React.FunctionComponent<LPStatusDetailsProps> = ({
  currentFixed,
  fixLow,
  fixHigh,
}) => {
  const inRange = fixLow <= currentFixed && currentFixed <= fixHigh;
  return (
    <LPStatusDetailsBox>
      <Typography colorToken="white100" typographyToken="primaryBodySmallBold">
        {inRange ? 'LP Position in range' : 'LP Position out of range'}
      </Typography>
      <Typography colorToken="white100" typographyToken="primaryBodySmallRegular">
        {inRange
          ? 'When the fixed rate is between your fixed low and fixed high rates your position will be in range.'
          : 'When the fixed rate is not between your fixed low or fixed high rates your position will be out of range.'}
      </Typography>
      <RowsBox>
        <RowBox>
          <Typography colorToken="white300" typographyToken="primaryBodySmallRegular">
            Current Fixed
          </Typography>
          <TokenTypography
            colorToken="white"
            token="%"
            typographyToken="primaryBodySmallRegular"
            value={formFormatNumber(currentFixed)}
          />
        </RowBox>
        <RowBox>
          <Typography colorToken="white300" typographyToken="primaryBodySmallRegular">
            Fixed low
          </Typography>
          <TokenTypography
            colorToken="white"
            token="%"
            typographyToken="primaryBodySmallRegular"
            value={formFormatNumber(fixLow)}
          />
        </RowBox>
        <RowBox>
          <Typography colorToken="white300" typographyToken="primaryBodySmallRegular">
            Fixed High
          </Typography>
          <TokenTypography
            colorToken="white"
            token="%"
            typographyToken="primaryBodySmallRegular"
            value={formFormatNumber(fixHigh)}
          />
        </RowBox>
        <HorizontalLine />
        <RowBox>
          <Typography colorToken="white300" typographyToken="primaryBodySmallRegular">
            Position
          </Typography>
          {inRange ? (
            <InRange typographyToken="primaryBodySmallRegular" />
          ) : (
            <OutOfRange typographyToken="primaryBodySmallRegular" />
          )}
        </RowBox>
      </RowsBox>
    </LPStatusDetailsBox>
  );
};
