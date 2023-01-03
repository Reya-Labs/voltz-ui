import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { colors } from '../../../../../../../../../theme';

export const AccruedRatesBox = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const AccruedRatesLabelTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
  color: ${colors.lavenderWeb2};
`;

export const AccruedRatesValueTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0.02em;
  color: ${colors.lavenderWeb};
`;
