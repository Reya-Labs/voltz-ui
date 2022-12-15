import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../components/atomic/Typography/Typography';
import { colors } from '../../../theme';

export const OptimisersBox = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const LPOptimisersTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 120%;

  text-transform: uppercase;

  color: ${colors.lavenderWeb.base};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;
