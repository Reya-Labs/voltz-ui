import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const NotificationBox = styled(Box)`
  padding: ${({ theme }) => theme.spacing(2, 4)};
`;

export const NotificationsContainer = styled(Box)`
  background-color: #19152a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing(6)};
  border-radius: 8px;
`;

export const ButtonBox = styled(Box)`
  width: 150px;
`;
