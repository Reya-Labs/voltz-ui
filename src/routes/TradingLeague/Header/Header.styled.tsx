import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../components/atomic/Typography/Typography';
import { colors } from '../../../theme';

const BaseTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  line-height: 14px;
  letter-spacing: 0.02em;
  font-weight: 400;
  font-size: 12px;
  color: ${colors.lavenderWeb.darken015};
`;
export const RankTypography = styled(BaseTypography)`
  width: 67px;
`;
export const TraderTypography = styled(BaseTypography)`
  flex: 1;
`;
export const PointsTypography = styled(BaseTypography)``;

export const HeaderBox = styled(Box)`
  display: flex;
  padding: ${({ theme }) => theme.spacing(0, 6)};
`;
