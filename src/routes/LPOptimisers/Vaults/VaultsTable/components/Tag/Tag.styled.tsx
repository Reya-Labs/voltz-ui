import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { Typography } from '../../../../../../components/atomic/Typography/Typography';
import { colors } from '../../../../../../theme';

export const TagContainer = styled(Box)`
  display: flex;
  border-radius: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1, 2)};
  background: #472043;
  justify-content: center;
`;

export const TagTypography = styled(Typography)`
  font-size: 14px;
  color: ${colors.wildStrawberry};
`;
