import { styled } from '@mui/material/styles';

import { Typography } from '../../../../../components/atomic/Typography/Typography';
import { colors } from '../../../../../theme';

export const TitleTypography = styled(Typography)`
  font-size: 12px;
  line-height: 14px;
  color: ${colors.lavenderWeb.darken010};
`;

export const TotalNotionalTypography = styled(Typography)`
  font-size: 40px;
  line-height: 48px;
  margin-top: ${({ theme }) => theme.spacing(2)};
  text-transform: uppercase;
  color: ${colors.lavenderWeb.base};
`;
