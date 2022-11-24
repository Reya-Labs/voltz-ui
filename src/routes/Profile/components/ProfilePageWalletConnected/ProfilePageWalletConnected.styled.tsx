import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { colors } from '../../../../theme';
import { Grid } from '../../../../components/layout/Grid';
import { Typography } from '../../../../components/atomic/Typography/Typography';

export const ContainerBox = styled(Box)`
  width: 724px;
  margin: 0 auto;
  background: transparent;
`;

export const Heading = styled(Typography)`
  font-weight: 400;
`;

export const Subheading = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  line-height: 160%;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  color: ${colors.lavenderWeb.darken015};
`;

export const CommunityEngagementBox = styled(Box)`
  margin-top: ${({ theme }) => theme.spacing(6)};
  padding: ${({ theme }) => theme.spacing(0, 4)};
`;

export const CommunityEngagementTypography = styled(Typography)`
  font-weight: 400;
`;

export const CommunityEngagementGrid = styled(Grid)`
  margin-top: ${({ theme }) => theme.spacing(6)};
  row-gap: ${({ theme }) => theme.spacing(2)};
`;

export const AchievedBadgesListBox = styled(Box)`
  margin-top: ${({ theme }) => theme.spacing(6)};
  padding: ${({ theme }) => theme.spacing(0, 4)};
`;

export const AchievedBadgesListHeading = styled(Typography)`
  font-weight: 400;
`;

export const AchievedBadgesListSeason = styled('span')`
  font-weight: 700;
`;

export const AchievedBadgesListSubheading = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  line-height: 160%;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  color: ${colors.lavenderWeb.darken015};
`;

export const AchievedBadgesListGrid = styled(Grid)`
  margin-top: ${({ theme }) => theme.spacing(6)};
  row-gap: ${({ theme }) => theme.spacing(2)};
`;

export const NoAchievedBadgesBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NoAchievedBadgesTypography = styled(Typography)`
  color: ${colors.lavenderWeb.base};
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

export const AchievedBadgesGrid = styled(Grid)`
  margin-top: ${({ theme }) => theme.spacing(6)};
  row-gap: ${({ theme }) => theme.spacing(4)};
  column-gap: ${({ theme }) => theme.spacing(4)};
`;

export const BadgeCollectionTypographyBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export const BadgeCollectionBox = styled(Box)`
  background-color: #1e1932;
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

export const Account = styled('span')`
  font-weight: 700;
`;
