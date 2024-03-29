import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { shouldNotForwardProps } from 'brokoli-ui';

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
  flex-direction: row;
  position: relative;
  gap: 4px;
`;

const NotionalBox = styled('div')`
  border-radius: 4px;
  padding: 12px 16px;
`;

export const NotionalSwapFixedBox = styled(NotionalBox)`
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.white600};
  background: ${({ theme }) => theme.colors.white900};
  flex: 1;
  padding: 8px;
`;

export const NotionalSwapSwapper = styled('div', shouldNotForwardProps(['animate']))<{
  animate: boolean;
}>`
  filter: drop-shadow(0px 1px 8px ${({ theme }) => theme.colors.black900})
    drop-shadow(0px 2px 40px ${({ theme }) => theme.colors.white500});
  background: ${({ theme }) => theme.colors.white100};
  width: 24px;
  height: 24px;
  position: absolute;
  top: calc(50% - 12px);
  left: calc(50% - 16px);
  border-radius: 50%;
  transition: box-shadow 200ms ease-in;
  cursor: pointer;
  ${({ animate }) =>
    animate
      ? css`
          animation: ${fullSpin} 500ms ease-in !important;
        `
      : ''};
  &:hover {
    animation: ${spin} 500ms linear 2 forwards;
    box-shadow: 0px 0px 20px ${({ theme }) => theme.colors.white600};
  }
`;

export const NotionalSwapVariableBox = styled(NotionalBox)`
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.white800};
  background: ${({ theme }) => theme.colors.black800};
  flex: 1;
  padding: 8px 8px 8px 16px;
`;

export const TopTextContent = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const BottomTextContent = styled('div')``;

export const NotionalSwapWrapperBox = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;
