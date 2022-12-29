import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../components/atomic/Typography/Typography';
import { colors } from '../../../theme';

export const UserSummaryBox = styled(Box)`
  background-color: #19152a;
  border-radius: 16px;
  border: 1px solid #2d2b3d;
  padding: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(6)};
`;

export const PointsSystemBox = styled(Box)`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

export const CurrentPositionTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-size: 16px;
  line-height: 120%;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const HeaderEntryBox = styled(Box)`
  display: flex;
  row-gap: ${({ theme }) => theme.spacing(2)};
  flex-direction: column;
`;

export const ProgressBarBox = styled(Box)`
  width: 40%;
`;

export const EndsTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
  color: ${colors.lavenderWeb.base};
`;

export const SeasonAndProgressBarBox = styled(Box)`
  display: flex;
  width: 80%;
  margin-bottom: 24px;
`;

export const SeasonBox = styled(Box)`
  border: 1px solid ${colors.wildStrawberry.base};
  padding: ${({ theme }) => theme.spacing(1, 2)};
  margin-right: ${({ theme }) => theme.spacing(4)};
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

export const SeasonTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  color: ${colors.wildStrawberry.base};
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
`;

export const SeasonNumberTypography = styled('span')`
  font-family: 'PixelOperatorMono', monospace;
  color: ${colors.lavenderWeb.base};
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
`;
