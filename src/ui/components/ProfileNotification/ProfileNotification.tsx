import { Pill, Typography } from 'brokoli-ui';
import { PillProps } from 'brokoli-ui/src/components/Pill';
import React from 'react';

import { ProfileNotificationBox } from './ProfileNotification.styled';

type ProfileNotificationProps = {
  text: React.ReactNode;
  pillText: string;
  pillColorToken: PillProps['colorToken'];
};
export const ProfileNotification: React.FunctionComponent<ProfileNotificationProps> = ({
  pillText,
  text,
  pillColorToken,
}) => (
  <ProfileNotificationBox>
    <Pill colorToken={pillColorToken} typographyToken="primaryBodySmallRegular" variant="regular">
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
