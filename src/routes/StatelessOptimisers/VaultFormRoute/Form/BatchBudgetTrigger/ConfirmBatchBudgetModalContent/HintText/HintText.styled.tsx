import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { colors } from '../../../../../../../theme';

export const HintTextTypography = styled(Typography)`
  font-family: 'PixelOperatorMono', monospace;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${colors.lavenderWeb.darken015};

  letter-spacing: 0.02em;
`;

export const BaseTextSpan = styled('span')`
  color: inherit;
`;
export const ErrorTextSpan = styled('span')`
  color: ${colors.wildStrawberry.base};
`;
export const SuccessTextSpan = styled('span')`
  color: ${colors.skyBlueCrayola.base};
`;
export const WarningTextSpan = styled('span')`
  color: ${colors.orangeYellow.base};
`;
