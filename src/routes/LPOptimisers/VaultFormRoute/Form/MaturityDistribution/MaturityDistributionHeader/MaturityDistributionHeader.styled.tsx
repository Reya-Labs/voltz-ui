import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../../../../components/atomic/Typography/Typography';
import { colors } from '../../../../../../theme';

export const MaturityDistributionHeaderTypography = styled(Typography)`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  font-family: 'PixelOperatorMono', monospace;
  color: ${colors.lavenderWeb};
  flex: 1;
`;

export const MaturityDistributionBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const MaturityDistributionInputLabel = styled(InputLabel)`
  position: relative;
  margin: 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  font-family: 'PixelOperatorMono', monospace;
  color: ${colors.lavenderWeb};
  flex: 1;
`;
