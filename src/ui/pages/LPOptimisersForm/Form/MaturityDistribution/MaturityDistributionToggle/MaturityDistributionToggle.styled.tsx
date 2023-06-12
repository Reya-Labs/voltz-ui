import styled from '@emotion/styled';
import InputLabel from '@mui/material/InputLabel';
import ToggleButtonComponent from '@mui/material/ToggleButton';

import { Typography } from '../../../../../../components/atomic/Typography/Typography';
import colors from '../../../../../../theme/colors';

export const MaturityDistributionTypography = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  font-family: 'PixelOperatorMono', monospace;
  padding: ${({ theme }) => theme.spacing(2, 4)};
  color: inherit;
`;

export const MaturityDistributionBox = styled('div')`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacing(2)};
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

export const MaturityDistributionInputLabel = styled(InputLabel)`
  position: relative;
  margin: 0;
`;
