import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Typography as CustomTypography } from '../../../components/atomic/Typography/Typography';

export const VaultFieldBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const TitleBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const TitleTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 130%;

  letter-spacing: 0.02em;

  color: #e5e1f9;
`;

export const VaultMetricsBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: ${({ theme }) => theme.spacing(16)};
`;

export const VaultApyTypography = styled(CustomTypography)`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 120%;

  color: #ff4aa9;
`;

export const VaultMaturityTypography = styled(CustomTypography)`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 120%;

  color: #e5e1f9;
`;
