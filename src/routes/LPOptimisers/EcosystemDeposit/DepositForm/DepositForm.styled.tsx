import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { MaskedIntegerField } from '../../../../components/composite/MaskedIntegerField/MaskedIntegerField';
import { colors } from '../../../../theme';

export const FormBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(6)};
  gap: ${({ theme }) => theme.spacing(4)};

  background: #19152a;
  border-radius: 8px;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

export const FullButtonBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
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

export const BackButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing(4, 6)};
  gap: ${({ theme }) => theme.spacing(2.5)};

  background: #1e1933;
  border-radius: 4px;

  color: ${colors.skyBlueCrayola.base};
`;

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

export const MaskedIntegerFieldStyled = styled(MaskedIntegerField)`
  border-color: #5d5296 !important;
  background-color: #2b2548 !important;
`;

export const MaturityDistributionsBox = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacing(4)};
  width: 100%;
`;
