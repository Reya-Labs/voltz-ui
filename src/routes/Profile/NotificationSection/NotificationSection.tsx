import { ButtonBox, NotificationBox, NotificationsContainer } from './NotificationSection.styled';
import { ProfileNotification } from '../ClaimNotification/ProfileNotification';
import { ClaimButton, ClaimButtonProps } from '../ClaimButton/ClaimButton';
import React from 'react';
import { BoldText } from '../BoldText.styled';

type NotificationSectionProps = {
  isOnGoingSeason: boolean;
  notClaimedBadgesCount: number;
  claimButtonBulkMode: ClaimButtonProps['mode'];
  onClaimBulkClick: () => void;
};
export const NotificationSection: React.FunctionComponent<NotificationSectionProps> = ({
  isOnGoingSeason,
  notClaimedBadgesCount,
  claimButtonBulkMode,
  onClaimBulkClick,
}) => {
  if (isOnGoingSeason) {
    return (
      <NotificationsContainer>
        <NotificationBox>
          <ProfileNotification pillText="CLAIM" text="UNAVAILABLE UNTIL THE END OF THE SEASON" />
        </NotificationBox>
      </NotificationsContainer>
    );
  }
  return (
    <NotificationsContainer>
      <NotificationBox>
        {notClaimedBadgesCount !== 0 ? (
          <>
            <ProfileNotification
              pillText={claimButtonBulkMode === 'claimError' ? 'ERROR' : 'BULK CLAIM'}
              text={
                claimButtonBulkMode === 'claimError' ? (
                  'ERROR WHEN CLAIMING, TRY AGAIN'
                ) : (
                  <>
                    YOU HAVE GOT <BoldText>{notClaimedBadgesCount} BADGES</BoldText> READY TO CLAIM
                  </>
                )
              }
            />
          </>
        ) : (
          <ProfileNotification pillText="KEEP TRADING" text="NO NEW BADGES TO CLAIM YET" />
        )}
      </NotificationBox>
      {notClaimedBadgesCount !== 0 ? (
        <ButtonBox>
          <ClaimButton displayError={false} mode={claimButtonBulkMode} onClick={onClaimBulkClick} />
        </ButtonBox>
      ) : null}
    </NotificationsContainer>
  );
};
