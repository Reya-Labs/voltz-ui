import { TokenTypography, Tooltip, Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { formFormatNumber } from '../../../../../../../../../app/features/forms/common';
import { PositionUI } from '../../../../../../../../../app/features/portfolio/types';
import { InRange } from './InRange';
import { LPStatusDetails } from './LPStatusDetails';
import { OutOfRange } from './OutOfRange';
import { PositionStatusBox } from './PositionStatus.styled';
import { TraderStatusDetails } from './TraderStatusDetails';

export type PositionStatusProps = {
  textsTypographyToken: TypographyToken;
  numbersTypographyToken: TypographyToken;
  status: PositionUI['status'];
  type: PositionUI['type'];
};
export const PositionStatus: React.FunctionComponent<PositionStatusProps> = ({
  textsTypographyToken,
  numbersTypographyToken,
  status,
  type,
}) => {
  if (status.variant === 'settled') {
    return (
      <Typography colorToken="lavenderWeb3" typographyToken={textsTypographyToken}>
        Settled
      </Typography>
    );
  }
  if (status.variant === 'matured') {
    return (
      <Typography colorToken="skyBlueCrayola" typographyToken={textsTypographyToken}>
        Matured
      </Typography>
    );
  }
  if (type === 'LP') {
    const inRange = status.fixLow <= status.currentFixed && status.currentFixed <= status.fixHigh;
    return (
      <Tooltip
        trigger={
          inRange ? (
            <InRange typographyToken={textsTypographyToken} />
          ) : (
            <OutOfRange typographyToken={textsTypographyToken} />
          )
        }
      >
        <LPStatusDetails
          currentFixed={status.currentFixed}
          fixHigh={status.fixHigh}
          fixLow={status.fixLow}
        />
      </Tooltip>
    );
  }

  const value = status.receiving - status.paying;
  const isReceiving = value >= 0;
  return (
    <Tooltip
      trigger={
        <PositionStatusBox>
          <Typography colorToken="lavenderWeb3" typographyToken={textsTypographyToken}>
            {isReceiving ? 'Receiving' : 'Paying'}
          </Typography>
          &nbsp;&nbsp;
          <TokenTypography
            colorToken={isReceiving ? 'skyBlueCrayola' : 'wildStrawberry'}
            token="%"
            typographyToken={numbersTypographyToken}
            value={formFormatNumber(value)}
          />
        </PositionStatusBox>
      }
    >
      <TraderStatusDetails
        currentFixed={status.currentFixed}
        paying={status.paying}
        positionRate={value}
        receiving={status.receiving}
      />
    </Tooltip>
  );
};
