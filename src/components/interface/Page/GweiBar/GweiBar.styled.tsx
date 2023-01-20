import Circle from '@mui/icons-material/Circle';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { colors } from '../../../../theme';
import { Typography } from '../../../atomic/Typography/Typography';

export const GweiBarBox = styled(Box)`
  height: 12px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  align-items: center;
`;
export const CircleIcon = styled(Circle)`
  width: 4px;
  height: 14px;
  border-radius: 16px;
  margin-right: ${({ theme }) => theme.spacing(2)};
`;

export const BlockNumberTypography = styled(Typography)`
  font-size: 14px;
  line-height: 1;
  display: flex;
  vertical-align: middle;
  color: ${colors.skyBlueCrayola.base};
`;
