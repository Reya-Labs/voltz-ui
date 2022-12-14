import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../../components/atomic/Typography/Typography';
import { colors } from '../../../../theme';

export const LPPositionsTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 120%;

  text-transform: uppercase;

  color: ${colors.lavenderWeb.base};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const NetMarginAndPositionsHealthBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing(6)};
`;

export const NetMarginAndPositionsHealthSkeleton = styled(Skeleton)`
  border-radius: 8px;
  height: 52px;
  width: 100%;
`;
