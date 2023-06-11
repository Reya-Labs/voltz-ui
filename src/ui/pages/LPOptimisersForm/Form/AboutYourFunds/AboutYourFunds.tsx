import React from 'react';

import {
  DescriptionBodyTypography,
  DescriptionBox,
  DescriptionTitleTypography,
  HighlightedText,
} from './AboutYourFunds.styled';

type Props = {
  depositsText: string;
};
export const AboutYourFunds: React.FunctionComponent<Props> = ({ depositsText }) => (
  <DescriptionBox>
    <DescriptionTitleTypography>ABOUT YOUR FUNDS</DescriptionTitleTypography>
    <DescriptionBodyTypography>
      <HighlightedText>
        {depositsText} are transferred to pools once a day, at 7pm UTC,
      </HighlightedText>{' '}
      to reduce gas costs, and will be locked into the pool until the pool reaches maturity. At this
      point the withdrawal mechanism will be enabled.
    </DescriptionBodyTypography>
    <DescriptionBodyTypography>
      Remember, returns are not guaranteed and you may get back less than you put in.
    </DescriptionBodyTypography>
  </DescriptionBox>
);
