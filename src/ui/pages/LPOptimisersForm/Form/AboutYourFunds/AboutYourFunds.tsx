import { Typography } from 'brokoli-ui';
import React from 'react';

import { DescriptionBox, HighlightedText } from './AboutYourFunds.styled';

type Props = {
  depositsText: string;
};
export const AboutYourFunds: React.FunctionComponent<Props> = ({ depositsText }) => (
  <DescriptionBox>
    <Typography colorToken="white100" typographyToken="primaryBodyMediumBold">
      About Your Funds
    </Typography>
    <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
      <HighlightedText>
        {depositsText} are transferred to pools once a day, at 7pm UTC,
      </HighlightedText>{' '}
      to reduce gas costs, and will be locked into the pool until the pool reaches maturity. At this
      point the withdrawal mechanism will be enabled.
    </Typography>
    <Typography colorToken="white400" typographyToken="primaryBodySmallRegular">
      Remember, returns are not guaranteed and you may get back less than you put in.
    </Typography>
  </DescriptionBox>
);
