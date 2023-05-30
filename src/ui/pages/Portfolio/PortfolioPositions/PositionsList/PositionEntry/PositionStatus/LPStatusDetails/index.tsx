import { HorizontalLine, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

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
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallBold">
        LP Position in range
      </Typography>
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
        When the fixed rate is between your fixed low and fixed high rates your position will be in
        range.
      </Typography>
      <RowsBox>
        <RowBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Current Fixed
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token="%"
            typographyToken="primaryBodySmallRegular"
            value={currentFixed}
          />
        </RowBox>
        <RowBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Fixed low
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token="%"
            typographyToken="primaryBodySmallRegular"
            value={fixLow}
          />
        </RowBox>
        <RowBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Fixed High
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token="%"
            typographyToken="primaryBodySmallRegular"
            value={fixHigh}
          />
        </RowBox>
        <HorizontalLine />
        <RowBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
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
