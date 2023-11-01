import { HorizontalLine, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { formFormatNumber } from '../../../../../../../../app/features/forms/common';
import { RowBox, RowsBox, TraderStatusDetailsBox } from './TraderStatusDetails.styled';

export type TraderStatusDetailsProps = {
  currentFixed: number;
  receiving: number;
  paying: number;
  positionRate: number;
};

export const TraderStatusDetails: React.FunctionComponent<TraderStatusDetailsProps> = ({
  currentFixed,
  receiving,
  paying,
  positionRate,
}) => {
  return (
    <TraderStatusDetailsBox>
      <Typography colorToken="white100" typographyToken="primaryBodySmallBold">
        Receiving rate
      </Typography>
      <Typography colorToken="white100" typographyToken="primaryBodySmallRegular">
        The delta between your paying and receiving rates determines your position.
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
            Receiving
          </Typography>
          <TokenTypography
            colorToken="white"
            token="%"
            typographyToken="primaryBodySmallRegular"
            value={formFormatNumber(receiving)}
          />
        </RowBox>
        <RowBox>
          <Typography colorToken="white300" typographyToken="primaryBodySmallRegular">
            Paying
          </Typography>
          <TokenTypography
            colorToken="white"
            token="%"
            typographyToken="primaryBodySmallRegular"
            value={formFormatNumber(paying)}
          />
        </RowBox>
        <HorizontalLine />
        <RowBox>
          <Typography colorToken="white300" typographyToken="primaryBodySmallRegular">
            Position
          </Typography>
          <TokenTypography
            colorToken={positionRate === 0 ? 'white' : positionRate < 0 ? 'error' : 'primary'}
            token="%"
            typographyToken="primaryBodySmallRegular"
            value={formFormatNumber(positionRate)}
          />
        </RowBox>
      </RowsBox>
    </TraderStatusDetailsBox>
  );
};
