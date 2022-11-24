import SkeletonComponent from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '../../../components/atomic/Typography/Typography';
import { colors } from '../../../theme';

export const Container = styled(Box)`
  background-color: #19152a;
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: column;
`;

export const BadgePillBox = styled(Box)`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

export const BadgeBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

export const TitleSkeleton = styled(SkeletonComponent)`
  font-size: 18px;
  line-height: 24px;
`;

export const TitleTypography = styled(Typography)`
  color: ${colors.lavenderWeb.base};
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const DescriptionSkeleton = styled(SkeletonComponent)`
  font-size: 12px;
  line-height: 18px;
`;

export const DescriptionTypography = styled(Typography)`
  color: ${colors.lavenderWeb.base};
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
`;
