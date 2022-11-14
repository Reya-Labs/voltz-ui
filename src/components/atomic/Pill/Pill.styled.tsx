import { styled } from '@mui/material/styles';
import Typography from '../Typography/Typography';
import { colors } from '@theme';

export const PillTypography = styled(Typography)`
  font-size: 14px;
  line-height: 14px;
  padding: ${({ theme }) => theme.spacing(1, 2)};
  border-radius: 4px;
  font-family: 'PixelOperatorMono', monospace;
`;

export const WildStrawberryPill = styled(PillTypography)`
  color: ${colors.wildStrawberry};
  background: ${colors.wildStrawberry6};
`;

export const OrangeYellowPill = styled(PillTypography)`
  color: ${colors.orangeYellow};
  background: ${colors.orangeYellow3};
`;

export const SkyBlueCrayolaPill = styled(PillTypography)`
  color: ${colors.skyBlueCrayola};
  background: ${colors.skyBlueCrayola3};
`;

export const LibertyPill = styled(PillTypography)`
  color: ${colors.lavenderWeb};
  background: ${colors.liberty2};
`;

export const LibertyDarkPill = styled(PillTypography)`
  color: ${colors.skyBlueCrayola};
  background: ${colors.liberty6};
`;
