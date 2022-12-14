import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { colors } from '../../../../../../../../theme';

export const PoolBox = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export const PoolLabelTypography = styled(Typography)`
  /* Label */
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height, or 117% */

  letter-spacing: 0.02em;
  text-transform: uppercase;

  /* Lavender Web 2 */
  color: #a49ebf;
`;

export const PoolBorrowingLabelTypography = styled(PoolLabelTypography)`
  color: ${colors.wildStrawberry.base};
  font-weight: 700;
`;

export const PoolValueTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;

  letter-spacing: 0.02em;

  /* Lavender Web */
  color: #e1ddf7;
`;
