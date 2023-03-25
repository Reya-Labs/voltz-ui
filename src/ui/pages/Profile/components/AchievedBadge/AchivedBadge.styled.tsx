import styled from '@emotion/styled';
import { colors, Skeleton as SkeletonComponent, Typography } from 'brokoli-ui';

export const Skeleton = styled(SkeletonComponent)`
  padding: 8px 24px 8px 16px;
  border-radius: 8px;
`;

export const ContainerBox = styled('div')`
  background-color: ${colors.lavenderWeb8};
  border-radius: 8px;
  padding: 8px 24px 8px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  pointer-events: none;
`;

export const AchievedContainerBox = styled(ContainerBox)`
  cursor: pointer;
  pointer-events: auto;
  background-color: ${colors.lavenderWeb7};

  &:hover {
    box-shadow: ${colors.liberty} 0px 0px 10px;
  }
`;

export const BadgePillBox = styled('div')`
  width: 150px;
  margin-right: 8px;
`;

export const TitleTypography = styled(Typography)`
  flex: 1;
`;

export const AchievedAtTypography = styled(Typography)`
  padding: 0 16px;
  text-align: right;
`;
