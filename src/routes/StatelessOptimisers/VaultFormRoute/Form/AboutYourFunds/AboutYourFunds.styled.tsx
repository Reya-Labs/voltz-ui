import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { colors } from '../../../../../theme';

export const DescriptionBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(4)};
  gap: ${({ theme }) => theme.spacing(2.5)};

  background: #1e1933;
  border-radius: ${({ theme }) => theme.spacing(1)};
`;

export const DescriptionTitleTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;

  letter-spacing: 0.02em;
  text-transform: uppercase;

  color: #c6c2da;
`;

export const DescriptionBodyTypography = styled(Typography)`
  font-family: 'DM Sans', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;

  letter-spacing: 0.02em;

  color: #9b97ad;
`;

export const HighlightedText = styled('span')`
  color: ${colors.lavenderWeb.base};
`;
