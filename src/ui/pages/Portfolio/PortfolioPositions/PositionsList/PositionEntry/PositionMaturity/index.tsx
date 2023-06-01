import { TokenTypography, Tooltip, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../../../app/features/portfolio/types';
import { SettleButton } from '../PositionStatus/PositionStatus.styled';
import { MaturityDetails } from './MaturityDetails';

type PositionMaturityProps = {
  typographyToken: TypographyToken;
  maturityEndTimestampInMS: PositionUI['maturityEndTimestampInMS'];
  status: PositionUI['status'];
  canSettle: PositionUI['canSettle'];
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
  canSettle,
}) => {
  if (status.variant === 'matured' && canSettle) {
    return (
      <SettleButton typographyToken={typographyToken} variant="secondary" onClick={onSettle}>
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
