import styled from '@emotion/styled';
import { Typography } from 'brokoli-ui';

import { Grid } from '../../../../components/Grid';

export const ContainerBox = styled('div')`
  width: 800px;
  margin: 0 auto;
  background: transparent;
`;

export const Subheading = styled(Typography)`
  margin-top: 8px;
`;

export const CommunityEngagementBox = styled('div')`
  margin-top: 24px;
  padding: 0 16px;
`;

export const CommunityEngagementGrid = styled(Grid)`
  margin-top: 24px;
  row-gap: 8px;
`;

export const AchievedBadgesListBox = styled('div')`
  margin-top: 24px;
  padding: 0 16px;
`;

export const AchievedBadgesListSubheading = styled(Typography)`
  margin-top: 8px;
`;

export const AchievedBadgesListGrid = styled(Grid)`
  margin-top: 24px;
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
  background-color: #1e1932;
  border-radius: 8px;
  padding: 16px;
  margin-top: 12px;
`;
