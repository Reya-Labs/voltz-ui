import { styled } from '@mui/material/styles';
import ToggleButtonComponent from '@mui/material/ToggleButton';

import { Typography } from '../../../../components/atomic/Typography/Typography';
import { colors } from '../../../../theme';

export const SeasonTypography = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  font-family: 'PixelOperatorMono', monospace;
  padding: ${({ theme }) => theme.spacing(1, 2)};
`;

export const ToggleButton = styled(ToggleButtonComponent)`
  &.MuiToggleButtonGroup-grouped {
    padding: 0;
    margin: 0;
    background: transparent;
  }

  &.MuiToggleButtonGroup-grouped:hover {
    background: ${colors.liberty4};
  }

  &.Mui-selected {
    background: ${colors.liberty4};
  }
`;
