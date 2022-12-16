import React from 'react';

import { IconLabel } from '../../../../../../components/composite/IconLabel/IconLabel';
import {
  MaturityDistributionBox,
  MaturityDistributionHeaderTypography,
  MaturityDistributionInputLabel,
} from './MaturityDistributionHeader.styled';

export const MaturityDistributionHeader: React.FunctionComponent = () => {
  return (
    <MaturityDistributionBox>
      <MaturityDistributionInputLabel shrink>
        <IconLabel
          icon="information-circle"
          info="Input what % of your funds you would like to allocate to each maturity. The total must add to 100%."
          label="DISTRIBUTION"
        />
      </MaturityDistributionInputLabel>
      <MaturityDistributionHeaderTypography>MATURITY</MaturityDistributionHeaderTypography>
      <MaturityDistributionHeaderTypography>POOL</MaturityDistributionHeaderTypography>
    </MaturityDistributionBox>
  );
};
