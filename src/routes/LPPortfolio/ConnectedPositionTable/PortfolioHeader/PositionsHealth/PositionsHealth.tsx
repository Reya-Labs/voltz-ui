import React from 'react';

import {
  DangerCircle,
  HealthyCircle,
  PositionHealthInfo,
  PositionsHealthBox,
  PositionsHealthInfoBox,
  PositionsHealthTypography,
  WarningCircle,
} from './PositionsHealth.styled';

export type PositionsHealthProps = {
  positionsDanger: number;
  positionsHealthy: number;
  positionsWarning: number;
};

export const PositionsHealth = ({
  positionsDanger,
  positionsHealthy,
  positionsWarning,
}: PositionsHealthProps) => (
  <PositionsHealthBox>
    <PositionsHealthTypography>POSITIONS HEALTH</PositionsHealthTypography>
    <PositionsHealthInfoBox>
      <PositionHealthInfo>
        {positionsHealthy} HEALTHY&nbsp;
        <HealthyCircle />
      </PositionHealthInfo>
      <PositionHealthInfo>
        {positionsWarning} HEALTHY&nbsp;
        <WarningCircle />
      </PositionHealthInfo>
      <PositionHealthInfo>
        {positionsDanger} HEALTHY&nbsp;
        <DangerCircle />
      </PositionHealthInfo>
    </PositionsHealthInfoBox>
  </PositionsHealthBox>
);
