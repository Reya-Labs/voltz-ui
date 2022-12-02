import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { colors } from '../../../../theme';

export const NotificationBox = styled(Box)`
  padding: ${({ theme }) => theme.spacing(2, 4)};
`;

export const NotificationContainer = styled(Box)`
  background-color: ${colors.liberty6};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
`;

export const NotificationsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(6)};
`;

export const ButtonBox = styled(Box)`
  width: 150px;
`;
