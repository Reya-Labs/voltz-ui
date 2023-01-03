import { styled } from '@mui/material/styles';

import { Typography } from '../../../components/atomic/Typography/Typography';
import { colors } from '../../../theme';

export const TitleTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-size: 40px;
  line-height: 120%;
  font-weight: 700;
`;

export const SubtitleTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  line-height: 160%;
  margin-top: ${({ theme }) => theme.spacing(2)};
  color: ${colors.lavenderWeb2};
  font-size: 14px;
`;
