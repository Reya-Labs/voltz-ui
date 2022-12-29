import { styled } from '@mui/material/styles';

import { Typography } from '../../../../components/atomic/Typography/Typography';
import { colors } from '../../../../theme';

export const PointsTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  color: ${colors.lavenderWeb.base};
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  padding: ${({ theme }) => theme.spacing(0, 4)};
  text-align: right;
`;
