import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { colors } from '../../../../../theme';

export const VaultInfoBox = styled(Typography)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: ${({ theme }) => theme.spacing(4)};

  align-self: stretch;
`;

export const PositionBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(2, 4)};
  gap: ${({ theme }) => theme.spacing(2)};

  background: #1e1933;
  border-radius: ${({ theme }) => theme.spacing(1)};

  align-self: stretch;
`;

export const PositionLabelTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  letter-spacing: 0.02em;

  color: #8b879d;
`;

export const PositionValueTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  letter-spacing: 0.02em;

  color: ${colors.skyBlueCrayola.base};
`;
