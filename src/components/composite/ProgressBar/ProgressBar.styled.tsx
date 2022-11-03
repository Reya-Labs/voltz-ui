import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { colors } from '@theme';
import { keyframes } from '@mui/system';

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

export const ProgressBarBox = styled(Box)<{ percentage: number }>`
  width: 0;
  background: ${colors.lavenderWeb.base};
  height: 100%;
  animation: ${({ percentage }) => grow(percentage)} 700ms ease-out forwards;
`;
