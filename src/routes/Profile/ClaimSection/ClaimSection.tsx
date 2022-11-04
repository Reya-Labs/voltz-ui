import {
  ClaimButtonBox,
  ClaimNotificationBox,
  ClaimNotificationContainer,
} from './ClaimSection.styled';
import { ClaimNotification } from '../ClaimNotification/ClaimNotification';
import { ClaimButton, ClaimButtonProps } from '../ClaimButton/ClaimButton';
import React from 'react';
import { BoldText } from '../BoldText.styled';

type ClaimSectionProps = {
  isOnGoingSeason: boolean;
  notClaimedBadgesCount: number;
  claimButtonBulkMode: ClaimButtonProps['mode'];
  onClaimBulkClick: () => void;
};
export const ClaimSection: React.FunctionComponent<ClaimSectionProps> = ({
  isOnGoingSeason,
  notClaimedBadgesCount,
  claimButtonBulkMode,
  onClaimBulkClick,
}) => {
  if (isOnGoingSeason) {
    return (
      <ClaimNotificationContainer>
        <ClaimNotificationBox>
          <ClaimNotification pillText="CLAIM" text="UNAVAILABLE UNTIL THE END OF THE SEASON" />
        </ClaimNotificationBox>
      </ClaimNotificationContainer>
    );
  }
  return (
    <ClaimNotificationContainer>
      <ClaimNotificationBox>
        {notClaimedBadgesCount !== 0 ? (
          <>
            <ClaimNotification
              pillText={claimButtonBulkMode === 'claimError' ? 'ERROR' : 'BULK CLAIM'}
              text={
                claimButtonBulkMode === 'claimError' ? (
                  <>
                    YOU HAVE GOT <BoldText>{notClaimedBadgesCount} BADGES</BoldText> READY TO CLAIM
                  </>
                ) : (
                  'ERROR WHEN CLAIMING, TRY AGAIN'
                )
              }
            />
          </>
        ) : (
          <ClaimNotification pillText="KEEP TRADING" text="NO NEW BADGES TO CLAIM YET" />
        )}
      </ClaimNotificationBox>
      {notClaimedBadgesCount !== 0 ? (
        <ClaimButtonBox>
          <ClaimButton displayError={false} mode={claimButtonBulkMode} onClick={onClaimBulkClick} />
        </ClaimButtonBox>
      ) : null}
    </ClaimNotificationContainer>
  );
};
