import SkeletonComponent from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { colors } from '../../../../theme';
import { Typography } from '../../../../components/atomic/Typography/Typography';

export const Skeleton = styled(SkeletonComponent)`
  padding: ${({ theme }) => theme.spacing(2, 2, 2, 4)};
  border-radius: 8px;
  font-size: 18px;
  line-height: 24px;
  width: 100%;
`;

export const ContainerBox = styled(Box)`
  background-color: #2b2548;
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(2, 2, 2, 4)};
  display: flex;
  opacity: 0.7;
  flex-direction: row;
  align-items: center;
  pointer-events: none;
`;

export const AchievedContainerBox = styled(ContainerBox)`
  cursor: pointer;
  pointer-events: auto;
  opacity: 1;

  &:hover {
    box-shadow: rgb(62 115 196 / 40%) 0px 0px 10px;
  }
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
