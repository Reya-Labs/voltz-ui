import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { colors } from '../../../theme';

export const FormBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;

  background: #19152a;
  border-radius: 8px;

  width: 398px;
  position: absolute;
`;

export const FullButtonBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  align-self: stretch;
`;

export const ButtonBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;

  width: 100%;
`;

export const SumbitButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  gap: 10px;

  background: #00556d;
  border-radius: 4px;

  color: #4de5ff;
  flex: 1;
`;

export const BackButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px 24px;
  gap: 10px;

  background: #2d2b3d;
  border-radius: 4px;

  color: #4de5ff;
`;

export const DescriptionBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 10px;

  background: #28233b;
  border-radius: 4px;
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
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;

  letter-spacing: 0.02em;

  color: #9b97ad;
`;

export const HintTextTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${colors.lavenderWeb.darken015};

  letter-spacing: 0.02em;
`;

export const PrefixHintTextSpan = styled('span')<{ color?: string }>`
  color: ${({ color = 'inherit' }) => color};
`;
