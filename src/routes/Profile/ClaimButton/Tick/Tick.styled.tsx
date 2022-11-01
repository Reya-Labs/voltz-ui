import { styled } from '@mui/material/styles';
import { colors } from '@theme';

export const IconAnimated = styled('div')`
  width: 16px;
  height: 16px;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Leg = styled('svg')`
  fill: ${colors.skyBlueCrayola.darken015};
  animation-fill-mode: forwards;
  animation-duration: 750ms;
  animation-iteration-count: 1;
  transform: scaleX(0);
  transform-origin: left bottom;
  opacity: 0;

  position: absolute;
  left: 0;
  top: -1px;
  width: 100%;
  height: 100%;
`;

export const TickPart1 = styled(Leg)`
  animation-name: tick-swipe1;
  transform: scaleX(0);
  transform-origin: left bottom;

  @keyframes tick-swipe1 {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 0.5;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: scaleX(1);
    }
  }
`;

export const TickPart2 = styled(Leg)`
  animation-name: tick-swipe2;
  transform: scaleY(0);
  transform-origin: right bottom;

  @keyframes tick-swipe2 {
    40% {
      opacity: 0;
    }
    47% {
      transform: scaleY(0.15);
      opacity: 1;
    }
    100% {
      transform: scaleY(1);
      opacity: 1;
    }
  }
`;

export const TickContainer = styled('div')`
  width: 100%;
  height: 100%;
  transform: rotate(45deg) scale(0.8);
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;
