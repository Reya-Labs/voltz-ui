import { HorizontalLine, TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { formFormatNumber } from '../../../../../../../../../../app/features/forms/common';
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
  console.log('### paying', paying);
  return (
    <TraderStatusDetailsBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallBold">
        Receiving rate
      </Typography>
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
        The delta between your paying and receiving rates determines your position.
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
            value={formFormatNumber(currentFixed)}
          />
        </RowBox>
        <RowBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Receiving
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token="%"
            typographyToken="primaryBodySmallRegular"
            value={formFormatNumber(receiving)}
          />
        </RowBox>
        <RowBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Paying
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token="%"
            typographyToken="primaryBodySmallRegular"
            value={formFormatNumber(paying)}
          />
        </RowBox>
        <HorizontalLine />
        <RowBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Position
          </Typography>
          <TokenTypography
            colorToken={
              positionRate === 0
                ? 'lavenderWeb'
                : positionRate < 0
                ? 'wildStrawberry'
                : 'skyBlueCrayola'
            }
            token="%"
            typographyToken="primaryBodySmallRegular"
            value={formFormatNumber(positionRate)}
          />
        </RowBox>
      </RowsBox>
    </TraderStatusDetailsBox>
  );
};
