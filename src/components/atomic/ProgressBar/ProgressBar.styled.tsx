import Box from '@mui/material/Box';
import { keyframes, styled } from '@mui/material/styles';

import { colors } from '../../../theme';
import { Typography } from '../Typography/Typography';

const grow = (percentage: number) => {
  return keyframes`
  0% {
    width: 0;
  }
  100% {
    width: ${percentage}%;
  }
`;
};

export const ProgressBarPercentageBox = styled(Box)<{ percentage: number }>`
  width: 0;
  background: ${colors.lavenderWeb.base};
  height: 100%;
  animation: ${({ percentage }) => grow(percentage)} 700ms ease-out forwards;
`;

export const ProgressBarBoxContainer = styled(Box)`
  width: 100%;
  background: ${colors.lavenderWeb.darken030};
  height: 4px;
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

export const ProgressBarContentBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export const ProgressBarContainer = styled(Box)`
  width: 100%;
`;

export const RightContentTypography = styled(Typography)`
  margin-left: ${({ theme }) => theme.spacing(5)};
`;

export const MiddleContentTypography = styled(Typography)`
  margin-left: ${({ theme }) => theme.spacing(5)};
`;
