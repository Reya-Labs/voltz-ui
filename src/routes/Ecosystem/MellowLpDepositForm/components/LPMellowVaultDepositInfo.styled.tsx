import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const VaultInfoBox = styled(Typography)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;

  align-self: stretch;
`;

export const CapBarTitleTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  letter-spacing: 0.02em;
  text-transform: uppercase;

  color: #9b97ad;
`;

export const CapBarBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;

  align-self: stretch;
`;

export const PositionBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 16px;
  gap: 8px;

  background: #1e1933;
  border-radius: 4px;

  align-self: stretch;
`;

export const PositionTypography = styled(Typography)<{ color: string }>`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  letter-spacing: 0.02em;

  color: ${({ color }) => color};
`;
