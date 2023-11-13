import styled from '@emotion/styled';

export const NotificationBox = styled('div')`
  padding: 8px 16px;
`;

export const NotificationContainer = styled('div')`
  background-color: ${({ theme }) => theme.colors.white900};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
`;

export const NotificationsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin-top: 24px;
`;

export const ButtonBox = styled('div')`
  width: 110px;
`;
