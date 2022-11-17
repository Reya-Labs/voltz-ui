import { styled } from '@mui/material/styles';
import Typography from '../Typography/Typography';
import { BaseColors, colors } from '@theme';

export type PillTypographyVariant = Extract<
  BaseColors,
  'wildStrawberry' | 'orangeYellow' | 'skyBlueCrayola' | 'vzCustomPink' | 'vzCustomMarine'
>;

export const PillTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'coloringVariant',
})<{ coloringVariant: PillTypographyVariant }>`
  font-size: 14px;
  line-height: 14px;
  padding: ${({ theme }) => theme.spacing(1, 2)};
  color: ${({ coloringVariant }) => colors[coloringVariant].base};
  background: ${({ coloringVariant }) => colors[coloringVariant].darken035};
  border-radius: 4px;
  font-family: 'PixelOperatorMono', monospace;
`;
