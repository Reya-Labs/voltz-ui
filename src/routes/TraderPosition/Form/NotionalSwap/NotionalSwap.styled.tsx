import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from 'brokoli-ui';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(55deg);
  }

  50% {
    transform: rotate(0deg);
  }

  75% {
    transform: rotate(-55deg);
  }
  
  100% {
    transform: rotate(0deg);
  }
`;

const fullSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
`;

export const NotionalSwapBox = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 8px;
`;

const NotionalBox = styled('div')`
  border-radius: 4px;
  padding: 12px 16px;
`;

export const NotionalSwapFixedBox = styled(NotionalBox)`
  background: linear-gradient(270deg, ${colors.lavenderWeb8} 0%, ${colors.lavenderWeb7} 54.61%);
  box-shadow: 0px 4px 4px ${colors.liberty8}, 0px 0px 1px ${colors.lavenderWeb1};
`;

export const NotionalSwapSwapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'animate',
})<{
  animate: boolean;
}>`
  filter: drop-shadow(0px 1px 8px ${colors.liberty8})
    drop-shadow(0px 2px 40px ${colors.lavenderWeb4});
  background: ${colors.lavenderWeb};
  width: 28px;
  height: 28px;
  position: absolute;
  top: calc(50% - 14px);
  left: calc(50% - 14px);
  border-radius: 50%;
  transition: box-shadow 300ms ease-in;
  cursor: pointer;
  ${({ animate }) =>
    animate
      ? css`
          animation: ${fullSpin} 500ms ease-in !important;
        `
      : ''};
  &:hover {
    animation: ${spin} 500ms linear 2 forwards;
    box-shadow: 0px 0px 20px ${colors.lavenderWeb5};
  }
`;

export const NotionalSwapVariableBox = styled(NotionalBox)`
  background: linear-gradient(90.95deg, ${colors.lavenderWeb8} 0.66%, ${colors.liberty8} 99.34%);
  box-shadow: 0px 0px 1px ${colors.lavenderWeb6};
`;

export const TopTextContent = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const BottomTextContent = styled('div')``;

export const NotionalSwapWrapperBox = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;
