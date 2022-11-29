import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { colors } from '../../../theme';

export const FormBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(4)};
  gap: ${({ theme }) => theme.spacing(4)};

  background: #19152a;
  border-radius: ${({ theme }) => theme.spacing(2)};

  width: 398px;
  position: absolute;
`;

export const FullButtonBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: ${({ theme }) => theme.spacing(2)};

  align-self: stretch;
`;

export const ButtonBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: ${({ theme }) => theme.spacing(6)};

  width: 100%;
`;

export const SumbitButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(4, 6)};
  gap: ${({ theme }) => theme.spacing(2.5)};

  background: #00556d;
  border-radius: 4px;

  color: ${colors.skyBlueCrayola.base};
  flex: 1;
`;

export const BackButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(4, 6)};
  gap: ${({ theme }) => theme.spacing(2.5)};

  background: #2d2b3d;
  border-radius: 4px;

  color: ${colors.skyBlueCrayola.base};
`;

export const DescriptionBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(4)};
  gap: ${({ theme }) => theme.spacing(2.5)};

  background: #28233b;
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
