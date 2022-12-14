import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const AccruedRatesBox = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const AccruedRatesLabelTypography = styled(Typography)`
  /* Label */
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  text-transform: uppercase;

  /* Lavender Web 2 */
  color: #a49ebf;
`;

export const AccruedRatesValueTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;

  letter-spacing: 0.02em;

  /* Lavender Web */
  color: #e1ddf7;
`;
