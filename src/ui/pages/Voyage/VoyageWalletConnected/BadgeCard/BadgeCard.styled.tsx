import { keyframes, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Skeleton as SkeletonComponent } from 'brokoli-ui';

const highlightAnimation = (theme: Theme) => keyframes`
  0% { 
    transform: scale(1);
    box-shadow: ${theme.colors.black300} 0px 0px 35px;
  }
  50% { 
    transform: scale(1.1);
    box-shadow: ${theme.colors.black300} 0px 0px 55px;
  }
  100% {
    transform: scale(1);
    box-shadow: ${theme.colors.black300} 0px 0px 35px;
  }
`;

export const Container = styled('div')`
  background-color: ${({ theme }) => theme.colors.white900};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition:
    box-shadow 0.25s ease-out 0s,
    border 0.25s ease-out 0s;
  box-sizing: border-box;

  &:hover {
    box-shadow: ${({ theme }) => theme.colors.black300} 0px 0px 35px;
  }
`;

export const HighlightedContainer = styled(Container)`
  animation: ${({ theme }) => highlightAnimation(theme)} 350ms linear forwards;
`;

export const BadgePillBox = styled('div')`
  margin-bottom: 16px;
`;

export const BadgeBox = styled('div', {
  shouldForwardProp: (prop) => prop !== 'achieved',
})<{ achieved: boolean }>`
  opacity: ${({ achieved }) => (achieved ? '1' : '0.3')};
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  border-radius: 4px;
`;

export const TitleBox = styled('div')`
  margin-bottom: 8px;
`;

export const DescriptionBox = styled('div')`
  margin-bottom: 16px;
`;

export const ClaimButtonBox = styled('div')`
  margin-top: auto;
`;

export const TitleSkeleton = styled(SkeletonComponent)`
  border-radius: 8px;
`;

export const DescriptionSkeleton = styled(SkeletonComponent)`
  border-radius: 8px;
`;

export const ClaimButtonSkeleton = styled(SkeletonComponent)`
  height: 36px;
  border-radius: 8px;
`;
