import { styled } from '@mui/material/styles';

import { Typography } from '../../../components/atomic/Typography/Typography';
import { Grid } from '../../../components/layout/Grid';

export const SeasonTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-size: 24px;
  margin-top: ${({ theme }) => theme.spacing(4)};
  font-weight: 700;
  display: flex;
  align-content: center;
`;

export const LeaderboardGrid = styled(Grid)`
  margin-top: ${({ theme }) => theme.spacing(6)};
  row-gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(0, 4)};
`;
