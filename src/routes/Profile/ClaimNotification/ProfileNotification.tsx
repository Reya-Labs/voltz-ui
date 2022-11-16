import { NotificationTypography, PillBox } from './ProfileNotification.styled';
import React from 'react';

type ProfileNotificationProps = {
  text: React.ReactNode;
  pillText: string;
};
export const ProfileNotification: React.FunctionComponent<ProfileNotificationProps> = ({
  pillText,
  text,
}) => (
  <NotificationTypography data-testid="ClaimNotification" variant="body2">
    <PillBox text={pillText} variant="wildStrawberry" />
    {text}
  </NotificationTypography>
);
