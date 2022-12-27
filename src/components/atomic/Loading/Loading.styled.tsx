import Box from '@mui/material/Box';
import { keyframes, styled } from '@mui/material/styles';

import { colors } from '../../../theme';

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0);
    border-bottom-color: ${colors.wildStrawberry.base};
  }

  25% {
    transform: rotate(90deg);
    border-bottom-color: ${colors.orangeYellow.base};
  }
  
  50% {
    transform: rotate(180deg);
    border-bottom-color: ${colors.ultramarineBlue.base};
  }

  75% {
    transform: rotate(270deg);
    border-bottom-color: ${colors.orangeYellow.base};
  }

  100% {
    transform: rotate(360deg);
    border-bottom-color: ${colors.wildStrawberry.base};
  }
`;

export const LoadingBox = styled(Box)`
  margin: 0px auto;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px dashed white;
  animation: ${spinnerAnimation} 1.5s linear infinite;
  box-sizing: border-box;
`;
