import { TokenTypography, Tooltip, Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { PositionUI } from '../../../../../../app/features/portfolio/types';
import { InRange } from './InRange';
import { LPStatusDetails } from './LPStatusDetails';
import { PositionStatusBox } from './PositionStatus.styled';
import { TraderStatusDetails } from './TraderStatusDetails';

export type PositionStatusProps = {
  typographyToken: TypographyToken;
  status: PositionUI['status'];
};
export const PositionStatus: React.FunctionComponent<PositionStatusProps> = ({
  typographyToken,
  status,
}) => {
  if (status.variant === 'none') {
    return (
      <Typography colorToken="lavenderWeb3" typographyToken={typographyToken}>
        --
      </Typography>
    );
  }
  if (status.variant === 'in-range') {
    return (
      <Tooltip trigger={<InRange typographyToken={typographyToken} />}>
        <LPStatusDetails
          currentFixed={status.currentFixed}
          fixHigh={status.fixHigh}
          fixLow={status.fixLow}
        />
      </Tooltip>
    );
  }

  const isReceiving = status.variant === 'receiving';
  return (
    <Tooltip
      trigger={
        <PositionStatusBox>
          <Typography colorToken="lavenderWeb3" typographyToken={typographyToken}>
            {isReceiving ? 'Receiving' : 'Paying'}
          </Typography>
          &nbsp;&nbsp;
          <TokenTypography
            colorToken={isReceiving ? 'skyBlueCrayola' : 'wildStrawberry'}
            token="%"
            typographyToken={typographyToken}
            value={status.value}
          />
        </PositionStatusBox>
      }
    >
      <TraderStatusDetails
        currentFixed={status.currentFixed}
        paying={status.paying}
        positionRate={status.value}
        receiving={status.receiving}
      />
    </Tooltip>
  );
};
