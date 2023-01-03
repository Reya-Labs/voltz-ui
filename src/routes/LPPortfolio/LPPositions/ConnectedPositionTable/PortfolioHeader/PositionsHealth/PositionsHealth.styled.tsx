import CircleIcon from '@mui/icons-material/Circle';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../../../../components/atomic/Typography/Typography';
import { colors } from '../../../../../../theme';

export const PositionsHealthBox = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const PositionsHealthInfoBox = styled(Box)`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
`;

export const PositionsHealthTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${colors.lavenderWeb1};
`;
export const PositionHealthInfo = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  background: ${colors.liberty5};
  border-radius: 4px;
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  color: ${colors.lavenderWeb};
`;

const Circle = styled(CircleIcon)`
  width: 4px;
  height: 4px;
  border-radius: 50%;
`;

export const HealthyCircle = styled(Circle)`
  color: ${colors.skyBlueCrayola};
`;

export const WarningCircle = styled(Circle)`
  color: ${colors.orangeYellow};
`;

export const DangerCircle = styled(Circle)`
  color: ${colors.wildStrawberry};
`;
