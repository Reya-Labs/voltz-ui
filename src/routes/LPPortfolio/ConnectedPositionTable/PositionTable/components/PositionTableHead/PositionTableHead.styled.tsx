import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../../../../components/atomic/Typography/Typography';
import { colors } from '../../../../../../theme';

const BaseButton = styled(Button)`
  /* Liberty 6 */
  background: #19152a;
  border-radius: 4px;

  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  padding: 4px 8px;
  /* Lavender Web */
  color: #e1ddf7;
`;

export const EditButton = styled(BaseButton)``;
export const SettleButton = styled(BaseButton)``;
export const RolloverButton = styled(BaseButton)`
  font-weight: 700;
  /* Liberty 7 */
  background: #0f0d18;
  /* Sky Blue Crayola */
  color: #4de5ff;

  margin-left: 4px;
`;
export const SettledButton = styled(BaseButton)`
  /* Lavender Web 5 */
  color: #4d476a;
`;

export const FeesTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;

  /* Lavender Web */
  color: #e5e1f9;
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
  color: ${colors.skyBlueCrayola.base};
`;

export const NegativeFeesValueTypography = styled(FeesValueTypography)`
  color: ${colors.wildStrawberry.base};
`;

export const FeesBox = styled(Box)`
  display: flex;

  padding: 4px 8px;
  /* Lavender Web 4 */
  border: 1px solid #2d2b3d;
  border-radius: 4px;
  margin-left: 16px;
`;
