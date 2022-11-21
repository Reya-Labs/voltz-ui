import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '../../../../../components/atomic/Typography/Typography';
import { colors } from '@theme';

export const TagContainer = styled(Box)`
  display: flex;
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing(1, 2)};
  margin-top: ${({ theme }) => theme.spacing(4)};
  background: #472043;
  margin-left: ${({ theme }) => theme.spacing(2)};
  width: 100px;
  justify-content: center;
`;

export const TagTypography = styled(Typography)`
  font-size: 14px;
  color: ${colors.wildStrawberry.base};
`;
