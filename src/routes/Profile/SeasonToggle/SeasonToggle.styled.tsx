import { styled } from '@mui/material/styles';
import Typography from '../../../components/atomic/Typography/Typography';
import ToggleButtonComponent from '@mui/material/ToggleButton';

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
  }
`;
