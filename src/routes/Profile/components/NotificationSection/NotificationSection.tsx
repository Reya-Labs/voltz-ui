import {
  ButtonBox,
  NotificationBox,
  NotificationContainer,
  NotificationsContainer,
} from './NotificationSection.styled';
import { ProfileNotification } from '../ProfileNotification/ProfileNotification';
import { ClaimButton, ClaimButtonProps } from '../ClaimButton/ClaimButton';
import React from 'react';
import { BoldText } from '../BoldText.styled';
import { CopyLinkButton, CopyLinkButtonProps } from '../CopyLinkButton/CopyLinkButton';

type NotificationSectionProps = {
  isOnGoingSeason: boolean;
  notClaimedBadgesCount: number;
  claimButtonBulkMode: ClaimButtonProps['mode'];
  onClaimBulkClick: () => void;
  onCopyLinkButtonClick: () => void;
  copyLinkButtonMode: CopyLinkButtonProps['mode'];
};
export const NotificationSection: React.FunctionComponent<NotificationSectionProps> = ({
  isOnGoingSeason,
  notClaimedBadgesCount,
  claimButtonBulkMode,
  onClaimBulkClick,
  onCopyLinkButtonClick,
  copyLinkButtonMode,
}) => {
  const copyLinkNotification = (
    <NotificationContainer>
      <NotificationBox>
        <ProfileNotification pillText="BONUS" text="EARN BADGES BY INVITING OTHERS" />
      </NotificationBox>
      <ButtonBox>
        <CopyLinkButton mode={copyLinkButtonMode} onClick={onCopyLinkButtonClick} />
      </ButtonBox>
    </NotificationContainer>
  );

  if (isOnGoingSeason) {
    return (
      <NotificationsContainer>
        {copyLinkNotification}
        <NotificationContainer>
          <NotificationBox>
            <ProfileNotification pillText="CLAIM" text="UNAVAILABLE UNTIL THE END OF THE SEASON" />
          </NotificationBox>
        </NotificationContainer>
      </NotificationsContainer>
    );
  }
  return (
    <NotificationsContainer>
      {copyLinkNotification}
      <NotificationContainer>
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
                      YOU HAVE GOT <BoldText>{notClaimedBadgesCount} BADGES</BoldText> READY TO
                      CLAIM
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
            <ClaimButton
              copies={{
                claim: 'Claim All',
                claimError: 'Claim All',
              }}
              displayError={false}
              mode={claimButtonBulkMode}
              onClick={onClaimBulkClick}
            />
          </ButtonBox>
        ) : null}
      </NotificationContainer>
    </NotificationsContainer>
  );
};
