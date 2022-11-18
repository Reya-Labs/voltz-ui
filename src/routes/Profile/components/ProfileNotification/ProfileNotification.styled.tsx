import { styled } from '@mui/material/styles';
import { colors } from '@theme';
import Typography from '../../../../components/atomic/Typography/Typography';
import { Pill } from '../../../../components/atomic/Pill';

export const NotificationTypography = styled(Typography)`
  color: ${colors.lavenderWeb.darken015};
`;

export const PillBox = styled(Pill)`
  margin-right: ${({ theme }) => theme.spacing(2)};
`;
