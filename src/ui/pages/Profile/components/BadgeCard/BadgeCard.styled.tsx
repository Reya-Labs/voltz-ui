import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { colors, Skeleton as SkeletonComponent } from 'brokoli-ui';

const highlightAnimation = keyframes`
  0% { 
    transform: scale(1);
    box-shadow: ${colors.liberty2} 0px 0px 35px;
  }
  50% { 
    transform: scale(1.1);
    box-shadow: ${colors.liberty2} 0px 0px 55px;
  }
  100% {
    transform: scale(1);
    box-shadow: ${colors.liberty2} 0px 0px 35px;
  }
`;

export const Container = styled('div')`
  background-color: ${colors.lavenderWeb8};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.25s ease-out 0s, border 0.25s ease-out 0s;
  box-sizing: border-box;

  &:hover {
    box-shadow: ${colors.liberty2} 0px 0px 35px;
  }
`;

export const HighlightedContainer = styled(Container)`
  animation: ${highlightAnimation} 350ms linear forwards;
`;

export const BadgePillBox = styled('div')`
  margin-bottom: 24px;
`;

export const BadgeBox = styled('div')`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
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
