import { TokenTypography, Typography } from 'brokoli-ui';
import React from 'react';

import { PnLDetailsBox, RowBox, RowsBox } from './PnLDetails.styled';

export const PnLDetails: React.FunctionComponent = () => {
  return (
    <PnLDetailsBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryBodySmallRegular">
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
        consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
      </Typography>
      <RowsBox>
        <RowBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Fees
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token=" USDC"
            typographyToken="primaryBodySmallRegular"
            value="100k"
          />
        </RowBox>
        <RowBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Margin
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token=" USDC"
            typographyToken="primaryBodySmallRegular"
            value="1k"
          />
        </RowBox>
        <RowBox>
          <Typography colorToken="lavenderWeb2" typographyToken="primaryBodySmallRegular">
            Maturity
          </Typography>
          <TokenTypography
            colorToken="lavenderWeb"
            token=""
            typographyToken="primaryBodySmallRegular"
            value="03 May 2023"
          />
        </RowBox>
      </RowsBox>
    </PnLDetailsBox>
  );
};
