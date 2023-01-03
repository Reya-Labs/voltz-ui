import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { colors } from '../../../theme';

export const PaginationBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

export const ActionButton = styled(Button)`
  font-size: 12px;
  line-height: 12px;
  color: ${colors.lavenderWeb};
  padding: ${({ theme }) => theme.spacing(2)};
`;

export const BarBox = styled(Box)`
  width: 96px;
  background: ${colors.lavenderWeb5};
  margin: ${({ theme }) => theme.spacing(2)};
`;

export const AnimatedBarBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'width',
})<{ width: number }>`
  width: ${({ width }) => width}%;
  background: ${colors.lavenderWeb};
  height: 100%;
  transition: width 500ms ease-in;
`;

export const ChevronLeftIcon = styled(ChevronLeft)`
  width: 14px;
  height: 14px;
  color: ${colors.lavenderWeb};
`;

export const ChevronRightIcon = styled(ChevronRight)`
  width: 14px;
  height: 14px;
  color: ${colors.lavenderWeb};
`;
