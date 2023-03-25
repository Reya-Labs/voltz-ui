import React from 'react';

import { NotificationTypography, PillBox } from './ProfileNotification.styled';

type ProfileNotificationProps = {
  text: React.ReactNode;
  pillText: string;
};
export const ProfileNotification: React.FunctionComponent<ProfileNotificationProps> = ({
  pillText,
  text,
}) => (
  <NotificationTypography data-testid="ProfileNotification" variant="body2">
    <PillBox text={pillText} variant="wildStrawberry" />
    {text}
  </NotificationTypography>
);
