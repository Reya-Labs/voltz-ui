import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../../../../../components/atomic/Typography/Typography';
import { colors } from '../../../../../../../theme';

const BaseButton = styled(Button)`
  background: ${colors.liberty6};
  border-radius: 4px;

  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  padding: 4px 8px;
  color: ${colors.lavenderWeb};
`;

export const SettleButton = styled(BaseButton)``;
export const RolloverButton = styled(BaseButton)`
  font-weight: 700;
  background: ${colors.liberty7};
  color: ${colors.skyBlueCrayola};

  margin-left: 4px;
`;
export const SettledButton = styled(BaseButton)`
  color: ${colors.lavenderWeb5};
`;

export const FeesTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  color: ${colors.lavenderWeb};
`;

const FeesValueTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;

  color: #4de5ff;
`;

export const PositiveFeesValueTypography = styled(FeesValueTypography)`
  color: ${colors.skyBlueCrayola};
`;

export const NegativeFeesValueTypography = styled(FeesValueTypography)`
  color: ${colors.wildStrawberry};
`;

export const FeesBox = styled(Box)`
  display: flex;

  padding: 4px 8px;
  /* Lavender Web 4 */
  border: 1px solid ${colors.lavenderWeb4};
  border-radius: 4px;
  margin-left: 16px;
`;

export const InfoBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;

  background: ${colors.liberty6};
  border-radius: 4px;

  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;

  color: ${colors.lavenderWeb2};
`;

const InfoTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
`;

export const PositiveTypography = styled(InfoTypography)`
  color: ${colors.skyBlueCrayola};
`;

export const WarningTypography = styled(InfoTypography)`
  color: ${colors.orangeYellow};
`;

export const NegativeTypography = styled(InfoTypography)`
  color: ${colors.wildStrawberry};
`;

export const ActionsBox = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;
