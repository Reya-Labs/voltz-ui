import styled from '@emotion/styled';
import { Typography } from 'brokoli-ui';

import { Grid } from '../../../../components/Grid';

export const ContainerBox = styled('div')`
  width: 800px;
  margin: 24px auto;
  background: transparent;
  padding-bottom: 70px;
`;

export const Subheading = styled(Typography)`
  margin-top: 16px;
`;

export const CommunityEngagementBox = styled('div')`
  width: 100%;
  box-sizing: border-box;
`;

export const CommunityEngagementGrid = styled(Grid)`
  margin-top: 24px;
  row-gap: 8px;
`;

export const AchievedBadgesListBox = styled('div')`
  width: 100%;
  box-sizing: border-box;
`;

export const AchievedBadgesListSubheading = styled(Typography)`
  margin-top: 8px;
`;

export const AchievedBadgesListGrid = styled(Grid)`
  margin-top: 16px;
  row-gap: 8px;
`;

export const NoAchievedBadgesBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NoAchievedBadgesTypography = styled(Typography)`
  margin-top: 16px;
`;

export const AchievedBadgesGrid = styled(Grid)`
  margin-top: 24px;
  row-gap: 16px;
  column-gap: 16px;
`;

export const BadgeCollectionTypographyBox = styled('div')`
  display: flex;
  justify-content: space-between;
`;

export const BadgeCollectionBox = styled('div')`
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const BadgesBox = styled('div')`
  background: linear-gradient(180deg, rgba(11, 9, 17, 0.81) 41.43%, rgba(30, 25, 51, 0.87) 110.49%);
  border-radius: 8px;
  margin-top: 24px;
  padding: 16px;
  gap: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
