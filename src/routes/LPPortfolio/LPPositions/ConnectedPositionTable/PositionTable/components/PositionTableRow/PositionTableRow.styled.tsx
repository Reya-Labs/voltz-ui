import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { colors } from '../../../../../../../theme';

export const RowBox = styled(Box)`
  background-color: ${colors.liberty7};
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
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${colors.lavenderWeb2};
`;
