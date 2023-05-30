import { TokenTypography, Tooltip, Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../../../app/features/portfolio/types';
import { SettleButton } from '../PositionStatus/PositionStatus.styled';
import { MaturityDetails } from './MaturityDetails';

type PositionMaturityProps = {
  typographyToken: TypographyToken;
  maturityEndTimestampInMS: PositionUI['maturityEndTimestampInMS'];
  status: PositionUI['status'];
  onSettle: () => void;
  maturityStartTimestampInMS: PositionUI['maturityStartTimestampInMS'];
  maturityFormatted: PositionUI['maturityFormatted'];
};

export const PositionMaturity: React.FunctionComponent<PositionMaturityProps> = ({
  typographyToken,
  maturityFormatted,
  maturityEndTimestampInMS,
  maturityStartTimestampInMS,
  status,
  onSettle,
}) => {
  if (status.variant === 'matured') {
    return (
      <Typography colorToken="skyBlueCrayola" typographyToken={typographyToken}>
        Matured
      </Typography>
    );
  }
  if (status.variant === 'settled') {
    return (
      <SettleButton typographyToken="primaryBodyXSmallBold" variant="secondary" onClick={onSettle}>
        Settle
      </SettleButton>
    );
  }
  return (
    <Tooltip
      trigger={
        <TokenTypography
          colorToken="lavenderWeb"
          token=""
          typographyToken={typographyToken}
          value={maturityFormatted}
        />
      }
    >
      <MaturityDetails
        maturityEndTimestampInMS={maturityEndTimestampInMS}
        maturityFormatted={maturityFormatted}
        maturityStartTimestampInMS={maturityStartTimestampInMS}
      />
    </Tooltip>
  );
};
