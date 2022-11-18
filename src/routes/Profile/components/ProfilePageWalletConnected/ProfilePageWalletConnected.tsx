import React, { useRef } from 'react';
import { Typography } from '@components/atomic';
import { doNothing, elideAddress, formatDateTimeWithOrdinal } from '@utilities';
import { BadgeCard, BadgeCardHandle } from '../BadgeCard/BadgeCard';
import { Page } from '@components/interface';
import { AchievedBadge, AchievedBadgeProps } from '../AchievedBadge/AchievedBadge';
import { BADGE_VARIANT_TIER_MAP } from '../../helpers';
import { Badge } from '../Badge/Badge';
import {
  Account,
  AchievedBadgesGrid,
  AchievedBadgesListBox,
  AchievedBadgesListGrid,
  AchievedBadgesListHeading,
  AchievedBadgesListSeason,
  AchievedBadgesListSubheading,
  BadgeCollectionBox,
  BadgeCollectionTypographyBox,
  CommunityEngagementBox,
  CommunityEngagementGrid,
  CommunityEngagementTypography,
  ContainerBox,
  Heading,
  NoAchievedBadgesBox,
  NoAchievedBadgesTypography,
  Subheading,
} from './ProfilePageWalletConnected.styled';
import { Season } from '../../../../hooks/season/types';
import { SeasonToggle } from '../SeasonToggle/SeasonToggle';
import { ClaimButtonProps } from '../ClaimButton/ClaimButton';
import { NotificationSection } from '../NotificationSection/NotificationSection';
import { BoldText } from '../BoldText.styled';
import { CopyLinkButtonProps } from '../CopyLinkButton/CopyLinkButton';
import { BadgeVariant, NON_PROGRAMMATIC_BADGES } from '../../data/getSeasonBadges';

export type ProfilePageWalletConnectedProps = {
  account: string;
  achievedBadges: AchievedBadgeProps[];
  season: Season;
  loading?: boolean;
  isOnGoingSeason: boolean;
  seasonBadgeVariants: string[];
  onSeasonChange: (season: Season) => void;
  onClaimBulkClick?: (badgeVariants: BadgeVariant[]) => void;
  claimButtonBulkMode: ClaimButtonProps['mode'];
  seasonOptions: Season[];
  onClaimButtonClick?: (badgeVariant: BadgeVariant) => void;
  claimButtonModes?: Record<BadgeVariant, ClaimButtonProps['mode']>;
  onCopyLinkButtonClick?: () => void;
  copyLinkButtonMode: CopyLinkButtonProps['mode'];
};

export const ProfilePageWalletConnected: React.FunctionComponent<ProfilePageWalletConnectedProps> =
  ({
    account,
    season,
    achievedBadges,
    loading,
    isOnGoingSeason,
    seasonBadgeVariants = [],
    onSeasonChange = doNothing,
    seasonOptions,
    onClaimButtonClick = doNothing,
    onClaimBulkClick = doNothing,
    claimButtonModes = {},
    claimButtonBulkMode,
    copyLinkButtonMode,
    onCopyLinkButtonClick = doNothing,
  }) => {
    const badgeCardRefs = useRef<Record<string, BadgeCardHandle>>({});

    const seasonLabel = season.label;
    const seasonStartDateFormatted = formatDateTimeWithOrdinal(season.startDate);
    const seasonEndDateFormatted = formatDateTimeWithOrdinal(season.endDate);
    const achievedBadgesMemo: AchievedBadgeProps[] = React.useMemo(() => {
      return seasonBadgeVariants
        .map((variant) => achievedBadges.find((c) => c.variant === variant))
        .filter((b) => b)
        .filter((b) =>
          BADGE_VARIANT_TIER_MAP[b!.variant] === 'easterEgg' ? b!.achievedAt : true,
        ) as AchievedBadgeProps[];
    }, [seasonBadgeVariants, achievedBadges]);

    const collection = achievedBadgesMemo.filter((aB) => aB.achievedAt);
    const notClaimedBadges = collection.filter((b) => !b.claimedAt);
    const handleSmoothScroll = React.useCallback((variant: BadgeVariant) => {
      badgeCardRefs.current[variant]?.scrollIntoView();
    }, []);
    return (
      <Page>
        <ContainerBox>
          <Heading variant="h1">
            WELCOME TO YOUR PROFILE&nbsp;
            <Account>{elideAddress(account.toUpperCase())}</Account>
          </Heading>
          <Subheading data-testid="Profile-BadgesExplained" variant="body2">
            Earn badges through your contribution to the community and activity on the protocol.
            Badges are earned throughout each Season, with minting available at the end of each
            Season. The more you collect the greater your contribution.{' '}
            <BoldText>{seasonLabel}</BoldText> {isOnGoingSeason ? 'runs' : 'ran'} between{' '}
            <BoldText>{seasonStartDateFormatted}</BoldText> and{' '}
            <BoldText>{seasonEndDateFormatted}</BoldText>.
          </Subheading>
          <NotificationSection
            isOnGoingSeason={isOnGoingSeason}
            notClaimedBadgesCount={notClaimedBadges.length}
            claimButtonBulkMode={claimButtonBulkMode}
            onClaimBulkClick={() => onClaimBulkClick(notClaimedBadges.map((b) => b.variant))}
            copyLinkButtonMode={copyLinkButtonMode}
            onCopyLinkButtonClick={onCopyLinkButtonClick}
          />
          <BadgeCollectionBox>
            <BadgeCollectionTypographyBox>
              <Typography variant="h2">YOUR BADGE COLLECTION</Typography>
              <SeasonToggle seasons={seasonOptions} onChange={onSeasonChange} season={season} />
            </BadgeCollectionTypographyBox>
            <AchievedBadgesGrid itemsPerRow={!loading && collection.length === 0 ? 1 : 3}>
              {loading &&
                Array.from({ length: 3 }, (index) => index).map((_, index) => (
                  <BadgeCard
                    claimButtonMode="claim"
                    key={index}
                    loading={loading}
                    variant="degenStuff"
                    disableClaiming={true}
                  />
                ))}
              {!loading &&
                collection.length !== 0 &&
                collection.map((badge, index) => (
                  <BadgeCard
                    ref={(ref: BadgeCardHandle) => (badgeCardRefs.current[badge.variant] = ref)}
                    key={`${badge.variant}${index}`}
                    variant={badge.variant}
                    loading={loading}
                    onClaimButtonClick={() => onClaimButtonClick(badge.variant)}
                    claimButtonMode={claimButtonModes[badge.variant] || 'claim'}
                    claimedAt={badge.claimedAt}
                    disableClaiming={isOnGoingSeason}
                  />
                ))}
              {!loading && collection.length === 0 && (
                <NoAchievedBadgesBox>
                  <Badge variant="noClaimedBadges" />
                  <NoAchievedBadgesTypography variant="body2">
                    Make contributions to the community or trade on the protocol to earn badges
                  </NoAchievedBadgesTypography>
                </NoAchievedBadgesBox>
              )}
            </AchievedBadgesGrid>
          </BadgeCollectionBox>

          <AchievedBadgesListBox>
            <AchievedBadgesListHeading variant="h2">
              THE COLLECTION -&nbsp;
              <AchievedBadgesListSeason>{seasonLabel.toUpperCase()}</AchievedBadgesListSeason>
            </AchievedBadgesListHeading>
            <AchievedBadgesListSubheading variant="body2">
              Make contributions to the community or trade on the protocol to earn badges{' '}
            </AchievedBadgesListSubheading>
            <AchievedBadgesListGrid itemsPerRow={1}>
              {achievedBadgesMemo.map((badge, index) => (
                <AchievedBadge
                  key={`${badge.variant}${index}`}
                  {...badge}
                  loading={loading}
                  onClick={() => handleSmoothScroll(badge.variant)}
                />
              ))}
            </AchievedBadgesListGrid>
          </AchievedBadgesListBox>

          <CommunityEngagementBox>
            <CommunityEngagementTypography variant="h2">
              COMMUNITY ENGAGEMENT
            </CommunityEngagementTypography>
            <CommunityEngagementGrid itemsPerRow={1}>
              {NON_PROGRAMMATIC_BADGES.map((badge, index) => (
                <AchievedBadge key={`${badge}${index}`} variant={badge} loading={loading} />
              ))}
            </CommunityEngagementGrid>
          </CommunityEngagementBox>
        </ContainerBox>
      </Page>
    );
  };
