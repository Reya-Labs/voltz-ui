import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../../../../../../components/atomic/Typography/Typography';
import { colors } from '../../../../../../../../theme';

const BaseTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
`;

export const HealthyTypography = styled(BaseTypography)`
  color: ${colors.skyBlueCrayola.base};
`;

export const WarningTypography = styled(BaseTypography)`
  color: ${colors.orangeYellow.base};
`;

export const DangerTypography = styled(BaseTypography)`
  color: ${colors.wildStrawberry.base};
`;

export const HealthFactorBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;

  /* Liberty 6 */
  background: #19152a;
  border-radius: 4px;

  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;

  /* Lavender Web 2 */
  color: #a49ebf;
`;
