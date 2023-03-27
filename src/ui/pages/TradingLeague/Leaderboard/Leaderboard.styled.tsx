import styled from '@emotion/styled';

import { Grid } from '../../../components/Grid';

export const LeaderboardBox = styled('div')`
  background: linear-gradient(180deg, rgba(11, 9, 17, 0.81) 41.43%, rgba(30, 25, 51, 0.87) 110.49%);
  border-radius: 8px;
  padding-bottom: 16px;
`;

export const LeaderboardGridBox = styled('div')`
  padding: 0 32px;
  margin-top: 24px;
`;

export const LeaderboardGrid = styled(Grid)`
  margin-top: 16px;
  row-gap: 8px;
`;
