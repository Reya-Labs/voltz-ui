import { styled } from '@mui/material/styles';
import RouteLink from '../../../components/atomic/RouteLink/RouteLink';
import Box from '@mui/system/Box';
import { Typography } from '../../../components/atomic';
import { colors } from '@theme';

export const LearnMoreLink = styled(RouteLink)`
  text-decoration: none;
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 14px;
  letter-spacing: 0.02em;
`;

export const EcosystemHeaderBox = styled(Box)`
  padding: 0;
  background: transparent;
  max-width: 743px;
`;

export const TitleTypography = styled(Typography)`
  font-size: 40px;
  line-height: 1.2;
  color: ${colors.lavenderWeb.base};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const DescriptionTypography = styled(Typography)`
  font-size: 14px;
  color: ${colors.lavenderWeb.darken015};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;
