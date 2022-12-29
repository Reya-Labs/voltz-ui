import { styled } from '@mui/material/styles';

import { Typography } from '../../../../components/atomic/Typography/Typography';
import { colors } from '../../../../theme';

export const PercentageTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  color: ${colors.lavenderWeb.base};
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
`;
