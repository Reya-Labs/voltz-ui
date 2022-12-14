import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const RowBox = styled(Box)`
  /* Liberty 7 */
  background-color: #0f0d18;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CellBox = styled(Box)`
  flex: 1;
`;

export const MaturityLabelTypography = styled(Typography)`
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
