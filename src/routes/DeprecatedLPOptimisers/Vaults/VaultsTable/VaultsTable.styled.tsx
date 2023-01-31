import { styled } from '@mui/material/styles';
import Box from '@mui/system/Box';

import { Grid } from '../../../../components/layout/Grid';

export const VaultsTableBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: ${({ theme }) => theme.spacing(8)};

  width: 1084px;
`;

export const VaultsGrid = styled(Grid)`
  row-gap: ${({ theme }) => theme.spacing(8)};
  column-gap: ${({ theme }) => theme.spacing(8)};
`;
