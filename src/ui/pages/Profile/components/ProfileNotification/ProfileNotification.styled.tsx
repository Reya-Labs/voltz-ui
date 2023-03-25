import { styled } from '@mui/material/styles';

import { Pill } from '../../../../../components/atomic/Pill/Pill';
import { Typography } from '../../../../../components/atomic/Typography/Typography';
import { colors } from '../../../../../theme';

export const NotificationTypography = styled(Typography)`
  color: ${colors.lavenderWeb.darken015};
`;

export const PillBox = styled(Pill)`
  margin-right: ${({ theme }) => theme.spacing(2)};
`;
