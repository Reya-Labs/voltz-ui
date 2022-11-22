import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '../../../../../components/atomic/Typography/Typography';
import colors from '../../../../../theme/colors';

export const MellowLPPositionSkeleton = styled(Skeleton)`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  padding: ${({ theme }) => theme.spacing(1, 1, 1, 3)};
`;

export const MellowLPPositionBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: ${({ theme }) => theme.spacing(4, 4, 4, 6)};
`;

export const MellowLPPositionBoxAndButtonContainer = styled(Box)`
  display: flex;
`;

export const MellowLPPositionInfoBox = styled(Box)`
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
