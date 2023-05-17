import { formatEthereumAddress, Typography } from 'brokoli-ui';
import React from 'react';

import { NotificationSection } from './NotificationSection';
import { VoyageBadge } from './VoyageBadge';
import { VoyageBadgeEntry } from './VoyageBadgeEntry';
import {
  BadgeCollectionBox,
  BadgeCollectionTypographyBox,
  BadgesBox,
  BadgesListGrid,
  BadgesListSubheading,
  ContainerBox,
  Subheading,
  VoyageBadgesGrid,
  VoyageBadgesListBox,
} from './VoyagePageWalletConnected.styled';

type VoyagePageWalletConnectedProps = {
  account: string;
};

export const VoyagePageWalletConnected: React.FunctionComponent<VoyagePageWalletConnectedProps> = ({
  account,
}) => {
  const loading = false;
  const achievedBadges = [
    {
      completed: true,
      isClaimable: false,
    },
  ];
  const badgesList = [
    {
      achievedAt: new Date().valueOf(),
    },
  ];

  return (
    <ContainerBox>
      <Typography colorToken="lavenderWeb" typographyToken="primaryHeader1Black">
        {`Welcome to the Voyage ${formatEthereumAddress(account)}`}
      </Typography>
      <Subheading
        colorToken="lavenderWeb2"
        data-testid="Voyage-VoyageExplained"
        typographyToken="primaryBodyMediumRegular"
      >
        We’re thrilled to announce an exciting new venture - Voyages. Voyages can start and finish
        at any time, providing a short period within which unique Soul-Bound-Tokens (aka Badges) can
        be earned.
        <br />
        <br />
        These unique badges will have a number of mysterious benefits. Learn more below, and
        check-in to see whether you’ve met the criteria for active Voyages.
      </Subheading>
      <NotificationSection />
      <BadgesBox>
        <BadgeCollectionBox data-testid="Voyage-BadgeCollectionBox">
          <BadgeCollectionTypographyBox>
            <Typography colorToken="lavenderWeb" typographyToken="primaryHeader2Black">
              Voltz Voyage v2
            </Typography>
          </BadgeCollectionTypographyBox>
          <VoyageBadgesGrid itemsPerRow={1}>
            {loading && <VoyageBadge completed={false} isClaimable={false} loading={loading} />}
            {!loading &&
              achievedBadges.length !== 0 &&
              achievedBadges.map((badge, index) => (
                <VoyageBadge
                  key={index}
                  completed={badge.completed}
                  isClaimable={badge.isClaimable}
                  loading={false}
                />
              ))}
          </VoyageBadgesGrid>
        </BadgeCollectionBox>
        <VoyageBadgesListBox data-testid="Voyage-AchievedBadgesListBox">
          <Typography colorToken="lavenderWeb" typographyToken="primaryHeader2Black">
            Your Voyage Collection
          </Typography>
          <BadgesListSubheading
            colorToken="lavenderWeb2"
            typographyToken="primaryBodyMediumRegular"
          >
            Trade or LP on the protocol to earn unique Voyage badges.{' '}
          </BadgesListSubheading>
          <BadgesListGrid data-testid="Voyage-AchievedBadgesListGrid" itemsPerRow={1}>
            {badgesList.map((badge, index) => (
              <VoyageBadgeEntry key={index} achievedAt={badge.achievedAt} loading={loading} />
            ))}
          </BadgesListGrid>
        </VoyageBadgesListBox>
      </BadgesBox>
    </ContainerBox>
  );
};
