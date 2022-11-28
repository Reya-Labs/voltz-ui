import { Typography } from '../../../atomic/Typography/Typography';
import { styled, keyframes } from '@mui/material/styles';
import { colors } from '../../../../theme';
import Box from '@mui/material/Box';

const slide = keyframes`
  from { 
    transform: translateX(0); 
  }
  to { 
    transform: translateX(-50%); 
  }
`;

export const BannerContainer = styled(Box)`
  background: linear-gradient(90deg, #201b35 0%, #372d65 50.52%, #2f2a54 100%);
  height: 24px;
  overflow: hidden;
  white-space: nowrap;

  position: relative;
  width: 100vw;
  max-width: 100%;
`;

export const BannerBox = styled(Box)`
  position: absolute;
  white-space: nowrap;
  will-change: transform;

  animation: ${slide} 20s linear infinite;
`;

const BannerTypography = styled(Typography)`
  display: inline-block;
  margin-right: ${({ theme }) => theme.spacing(4)};
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
`;

export const BannerTypographyWildStrawberry = styled(BannerTypography)`
  color: ${colors.wildStrawberry.base};
`;

export const BannerTypographyUltramarineBlue = styled(BannerTypography)`
  color: ${colors.ultramarineBlue.base};
`;

export const BannerTypographySkyBlueCrayola = styled(BannerTypography)`
  color: ${colors.skyBlueCrayola.base};
`;
