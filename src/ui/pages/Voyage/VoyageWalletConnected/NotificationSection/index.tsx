import React from 'react';

import { ProfileNotification } from '../../../../components/ProfileNotification/ProfileNotification';
import {
  ButtonBox,
  LearnMoreButton,
  NotificationBox,
  NotificationContainer,
  NotificationsContainer,
} from './NotificationSection.styled';

type NotificationSectionProps = {
  onLearnMoreClick: () => void;
};
export const NotificationSection: React.FunctionComponent<NotificationSectionProps> = ({
  onLearnMoreClick,
}) => (
  <NotificationsContainer>
    <NotificationContainer>
      <NotificationBox>
        <ProfileNotification
          pillColorToken="orangeYellow"
          pillText="Voltz Protocol v2 Voyage"
          text="Time to go on a trip"
        />
      </NotificationBox>
      <ButtonBox>
        <LearnMoreButton variant="primary" onClick={onLearnMoreClick}>
          Learn More
        </LearnMoreButton>
      </ButtonBox>
    </NotificationContainer>
  </NotificationsContainer>
);
