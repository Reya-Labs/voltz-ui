import { styled } from '@mui/material/styles';
import { Grid } from '@components/layout';

export const MellowLPGrid = styled(Grid)`
  row-gap: ${({ theme }) => theme.spacing(8)};
  column-gap: ${({ theme }) => theme.spacing(8)};
`;
