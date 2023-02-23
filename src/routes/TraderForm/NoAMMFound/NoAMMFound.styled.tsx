import { styled } from '@mui/material/styles';
import { Typography } from 'brokoli-ui';

import { Pill } from '../../../components/atomic/Pill/Pill';

export const ContainerBox = styled('div')`
  width: 724px;
  margin: 0 auto;
  background: transparent;
`;

export const PillBox = styled(Pill)`
  margin-right: ${({ theme }) => theme.spacing(2)};
`;

export const Subheading = styled(Typography)`
  margin-top: 8px;
`;

export const NoAMMFoundBox = styled('div')`
  margin-top: 24px;
  background-color: #19152a;
  border-radius: 8px;
  padding: 8px 16px;
`;
