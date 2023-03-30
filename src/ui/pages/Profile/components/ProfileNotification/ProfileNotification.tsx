import { Pill, Typography } from 'brokoli-ui';
import React from 'react';

import { ProfileNotificationBox } from './ProfileNotification.styled';

type ProfileNotificationProps = {
  text: React.ReactNode;
  pillText: string;
};
export const ProfileNotification: React.FunctionComponent<ProfileNotificationProps> = ({
  pillText,
  text,
}) => (
  <ProfileNotificationBox>
    <Pill colorToken="wildStrawberry" typographyToken="primaryBodySmallRegular">
      {pillText}
    </Pill>
    <Typography
      colorToken="lavenderWeb"
      data-testid="ProfileNotification"
      typographyToken="primaryBodySmallRegular"
    >
      {text}
    </Typography>
  </ProfileNotificationBox>
);
