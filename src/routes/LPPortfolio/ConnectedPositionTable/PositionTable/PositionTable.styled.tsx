import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { Grid } from '../../../../components/layout/Grid';

export const PositionsList = styled(Grid)`
  margin-top: ${({ theme }) => theme.spacing(6)};
  row-gap: ${({ theme }) => theme.spacing(6)};
`;

export const PositionsListItemBox = styled(Box)`
  display: flex;
  flex-direction: column;
  /* Liberty 5 */
  background: #1e1933;
  border-radius: 8px;
`;

export const PositionsListTopBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 16px 16px 0;
  row-gap: 16px;
`;
