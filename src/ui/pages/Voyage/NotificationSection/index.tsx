import React from 'react';

import { ProfileNotification } from '../../../components/ProfileNotification/ProfileNotification';
import {
  ButtonBox,
  LearnMoreButton,
  NotificationBox,
  NotificationContainer,
  NotificationsContainer,
} from './NotificationSection.styled';

export const NotificationSection: React.FunctionComponent = () => {
  const handleOnLearnMoreClick = () => {};
  return (
    <NotificationsContainer>
      <NotificationContainer>
        <NotificationBox>
          <ProfileNotification
            pillColorToken="orangeYellow"
            pillText="Voltz Voyage"
            text="Time to go on a trip"
          />
        </NotificationBox>
        <ButtonBox>
          <LearnMoreButton variant="primary" onClick={handleOnLearnMoreClick}>
            Learn More
          </LearnMoreButton>
        </ButtonBox>
      </NotificationContainer>
    </NotificationsContainer>
  );
};
