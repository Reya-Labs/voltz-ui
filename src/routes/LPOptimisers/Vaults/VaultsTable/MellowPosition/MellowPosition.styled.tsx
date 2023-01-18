import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../../../components/atomic/Typography/Typography';
import colors from '../../../../../theme/colors';

export const MellowPositionSkeleton = styled(Skeleton)`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  padding: ${({ theme }) => theme.spacing(1, 1, 1, 3)};
`;

export const MellowPositionBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: ${({ theme }) => theme.spacing(4, 4, 4, 6)};
`;

export const MellowPositionBoxAndButtonContainer = styled(Box)`
  display: flex;
  border-radius: 0px 0px 8px 8px;
`;

export const MellowPositionInfoBox = styled(Box)`
  display: flex;
`;

export const PositionTypography = styled(Typography)`
  font-size: 14px;
  color: #9b97ad;
  text-transform: uppercase;
`;

export const DepositTypography = styled(Typography)`
  font-size: 14px;
  text-transform: uppercase;
  color: ${colors.skyBlueCrayola.base};
  margin-left: ${({ theme }) => theme.spacing(1)};
`;

export const DepositButton = styled(Button)`
  background: #38305b;
  border-radius: 0px 0px 8px 0px;
  padding: ${({ theme }) => theme.spacing(2.5)};
  color: ${colors.skyBlueCrayola.base};
  font-size: 14px;
  line-height: 20px;
  box-shadow: none;
`;
