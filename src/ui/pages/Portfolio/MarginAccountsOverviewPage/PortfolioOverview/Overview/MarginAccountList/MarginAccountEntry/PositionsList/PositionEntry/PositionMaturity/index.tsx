import { TokenTypography, Tooltip, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../../../../../../../app/features/portfolio/types';
import { MaturityDetails } from './MaturityDetails';

type PositionMaturityProps = {
  typographyToken: TypographyToken;
  maturityEndTimestampInMS: PositionUI['maturityEndTimestampInMS'];
  maturityStartTimestampInMS: PositionUI['maturityStartTimestampInMS'];
  maturityFormatted: PositionUI['maturityFormatted'];
};

export const PositionMaturity: React.FunctionComponent<PositionMaturityProps> = ({
  typographyToken,
  maturityFormatted,
  maturityEndTimestampInMS,
  maturityStartTimestampInMS,
}) => {
  return (
    <Tooltip
      trigger={
        <TokenTypography
          colorToken="white"
          token=""
          typographyToken={typographyToken}
          value={maturityFormatted}
        />
      }
    >
      <MaturityDetails
        maturityEndTimestampInMS={maturityEndTimestampInMS}
        maturityStartTimestampInMS={maturityStartTimestampInMS}
      />
    </Tooltip>
  );
};
