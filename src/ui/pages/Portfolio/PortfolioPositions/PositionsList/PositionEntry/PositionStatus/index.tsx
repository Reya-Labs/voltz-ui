import { TokenTypography, Tooltip, Typography, TypographyToken } from 'brokoli-ui';
import React from 'react';

import { formFormatNumber } from '../../../../../../../app/features/forms/common/utils';
import { PositionUI } from '../../../../../../../app/features/portfolio/types';
import { InRange } from './InRange';
import { LPStatusDetails } from './LPStatusDetails';
import { OutOfRange } from './OutOfRange';
import { PositionStatusBox, RolloverButton } from './PositionStatus.styled';
import { TraderStatusDetails } from './TraderStatusDetails';

export type PositionStatusProps = {
  textsTypographyToken: TypographyToken;
  numbersTypographyToken: TypographyToken;
  status: PositionUI['status'];
  type: PositionUI['type'];
  canRollover: PositionUI['canRollover'];
  onRollover: () => void;
};
export const PositionStatus: React.FunctionComponent<PositionStatusProps> = ({
  textsTypographyToken,
  numbersTypographyToken,
  status,
  type,
  onRollover,
  canRollover,
}) => {
  if (status.variant === 'settled') {
    return (
      <Typography colorToken="lavenderWeb3" typographyToken={textsTypographyToken}>
        Settled
      </Typography>
    );
  }
  if (status.variant === 'matured') {
    if (!canRollover) {
      return null;
    }
    return (
      <RolloverButton
        typographyToken={textsTypographyToken}
        variant="secondary"
        onClick={onRollover}
      >
        Rollover
      </RolloverButton>
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
