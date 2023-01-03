import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { Grid } from '../../../../../components/layout/Grid';
import { colors } from '../../../../../theme';

export const PositionsList = styled(Grid)`
  margin-top: ${({ theme }) => theme.spacing(6)};
  row-gap: ${({ theme }) => theme.spacing(6)};
`;

export const PositionsListItemBox = styled(Box)`
  display: flex;
  flex-direction: column;
  background: ${colors.liberty5};
  border-radius: 8px;
`;

export const PositionsListTopBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 16px 16px 0;
  row-gap: 16px;
`;
