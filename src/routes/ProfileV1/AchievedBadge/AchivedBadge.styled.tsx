import SkeletonComponent from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { colors } from '../../../theme';
import { Typography } from '../../../components/atomic/Typography/Typography';

export const Skeleton = styled(SkeletonComponent)`
  padding: ${({ theme }) => theme.spacing(2, 2, 2, 4)};
  border-radius: 8px;
  font-size: 18px;
  line-height: 24px;
  width: 100%;
`;

export const ContainerBox = styled(Box)<{ isAchieved: boolean }>`
  background-color: #2b2548;
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(2, 2, 2, 4)};
  display: flex;
  flex-direction: row;
  opacity: ${({ isAchieved }) => (isAchieved ? 1 : 0.7)};
  align-items: center;
`;

export const BadgePillBox = styled(Box)`
  width: 150px;
  margin-right: ${({ theme }) => theme.spacing(2)};
`;

export const TitleTypography = styled(Typography)`
  color: ${colors.lavenderWeb.base};
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  flex: 1;
`;

export const AchievedAtTypography = styled(Typography)`
  color: ${colors.lavenderWeb.base};
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  padding: ${({ theme }) => theme.spacing(0, 4)};
  text-align: right;
`;
