import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { colors } from '../../../../../theme';

export const MaturityDistributionBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MaturityDistributionErrorTypography = styled(Typography)`
  color: ${colors.wildStrawberry.base};
  font-family: 'PixelOperatorMono', monospace;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

export const MaturityDistributionsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacing(4)};
  width: 100%;
`;
