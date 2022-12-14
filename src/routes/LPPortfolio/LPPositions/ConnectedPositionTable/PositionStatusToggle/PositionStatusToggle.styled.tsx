import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ToggleButtonComponent from '@mui/material/ToggleButton';

import { Typography } from '../../../../../components/atomic/Typography/Typography';
import { colors } from '../../../../../theme';

export const PositionStatusToggleTypography = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  font-family: 'PixelOperatorMono', monospace;
  padding: ${({ theme }) => theme.spacing(2, 4)};
  color: inherit;
`;

export const PositionStatusToggleBox = styled(Box)`
  display: flex;
  flex-direction: column;

  row-gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(14)};
`;

export const ToggleButton = styled(ToggleButtonComponent)`
  color: #5d5296;
  background: #0f0d18;

  &.MuiToggleButtonGroup-grouped {
    padding: 0;
    margin: 0;
    background: transparent;
  }

  &.MuiToggleButtonGroup-grouped:hover {
    background: #251f3f;
  }

  &.Mui-selected {
    background: #2b2548;
    color: ${colors.lavenderWeb.base};
  }
`;
