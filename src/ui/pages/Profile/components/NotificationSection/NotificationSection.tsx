import React from 'react';

import { ClaimButton, ClaimButtonProps } from '../ClaimButton/ClaimButton';
import { CopyLinkButton, CopyLinkButtonProps } from '../CopyLinkButton/CopyLinkButton';
import { HighlightedText } from '../HighlightedText.styled';
import { ProfileNotification } from '../ProfileNotification/ProfileNotification';
import {
  ButtonBox,
  NotificationBox,
  NotificationContainer,
  NotificationsContainer,
} from './NotificationSection.styled';

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
        <ProfileNotification pillText="Bonus" text="Earn badges by inviting others" />
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
            <ProfileNotification pillText="Claim" text="Unavailable until the end of the season" />
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
                pillText={claimButtonBulkMode === 'claimError' ? 'Error' : 'Bulk Claim'}
                text={
                  claimButtonBulkMode === 'claimError' ? (
                    'Error when claiming, try again'
                  ) : (
                    <>
                      You have got <HighlightedText>{notClaimedBadgesCount} badges</HighlightedText>{' '}
                      ready to claim
                    </>
                  )
                }
              />
            </>
          ) : (
            <ProfileNotification pillText="Keep trading" text="No new badges to claim yet" />
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
