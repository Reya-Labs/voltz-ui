import styled from '@emotion/styled';
import { Skeleton } from 'brokoli-ui';

export const VoyageBadgeBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`;

export const VoyagePillBox = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`;

export const VoyageBadgeImageBox = styled('div', {
  shouldForwardProp: (prop) => prop !== 'completed',
})<{ completed: boolean }>`
  width: 100%;
  ${({ completed }) => (completed ? '' : 'opacity: 0.1')};
`;
export const VoyageBadgeHeaderBox = styled('div')`
  display: flex;
  flex-direction: row;
`;
export const VoyageBadgeTextBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 100%;
`;

export const VoyageButtonBox = styled('div')`
  width: 100%;
`;

export const SkeletonPill = styled(Skeleton)`
  width: 60px;
  border-radius: 4px;
  height: 22px;
`;

export const SkeletonImage = styled(Skeleton)`
  width: 100%;
  height: 160px;
  border-radius: 4px;
`;

export const SkeletonHeaderTypography = styled(Skeleton)`
  width: 100%;
  height: 20px;
  border-radius: 4px;
`;
export const SkeletonSubheaderTypography = styled(Skeleton)`
  width: 100%;
  height: 36px;
  border-radius: 4px;
`;

export const SkeletonButton = styled(Skeleton)`
  width: 100%;
  height: 50px;
  border-radius: 4px;
`;
