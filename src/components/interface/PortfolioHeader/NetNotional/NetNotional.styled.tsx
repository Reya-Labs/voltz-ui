import { styled } from '@mui/material/styles';
import { Typography } from '../../../atomic/Typography/Typography';

export const TitleTypography = styled(Typography)`
  font-size: 12px;
  line-height: 14px;
`;

export const TotalNotionalTypography = styled(Typography)`
  font-size: 40px;
  line-height: 48px;
  margin-top: ${({ theme }) => theme.spacing(2)};
  text-transform: uppercase;
`;
