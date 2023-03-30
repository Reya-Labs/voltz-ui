import { SupportedChainId } from '@voltz-protocol/v1-sdk';
import { formatEthereumAddress, Typography } from 'brokoli-ui';
import React, { useRef } from 'react';

import { Season } from '../../../../../hooks/season/types';
import { formatDateTimeWithOrdinal } from '../../../../../utilities/date';
import { doNothing } from '../../../../../utilities/doNothing';
import {
  BadgeVariant,
  NON_PROGRAMMATIC_BADGES,
  NonProgrammaticBadges,
} from '../../data/getSeasonBadges';
import { BADGE_VARIANT_TIER_MAP } from '../../helpers';
import { AchievedBadge, AchievedBadgeProps } from '../AchievedBadge/AchievedBadge';
import { Badge } from '../Badge/Badge';
import { BadgeCard, BadgeCardHandle } from '../BadgeCard/BadgeCard';
import { ClaimButtonProps } from '../ClaimButton/ClaimButton';
import { CopyLinkButtonProps } from '../CopyLinkButton/CopyLinkButton';
import { HighlightedText } from '../HighlightedText.styled';
import { NotificationSection } from '../NotificationSection/NotificationSection';
import { SeasonToggle } from '../SeasonToggle/SeasonToggle';
import {
  AchievedBadgesGrid,
  AchievedBadgesListBox,
  AchievedBadgesListGrid,
  AchievedBadgesListSubheading,
  BadgeCollectionBox,
  BadgeCollectionTypographyBox,
  BadgesBox,
  CommunityEngagementBox,
  CommunityEngagementGrid,
  ContainerBox,
  NoAchievedBadgesBox,
  NoAchievedBadgesTypography,
  Subheading,
} from './ProfilePageWalletConnected.styled';

export type ProfilePageWalletConnectedProps = {
  account: string;
  badges: AchievedBadgeProps[];
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
  chainId: SupportedChainId;
};

export const ProfilePageWalletConnected: React.FunctionComponent<ProfilePageWalletConnectedProps> =
  ({
    account,
    season,
    badges,
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
    const badgesMemo: AchievedBadgeProps[] = React.useMemo(() => {
      if (loading) {
        return seasonBadgeVariants.map(
          (variant) =>
            ({
              variant,
              achievedAt: undefined,
              claimedAt: undefined,
            } as AchievedBadgeProps),
        );
      }

      return seasonBadgeVariants
        .map((variant) => badges.find((c) => c.variant === variant))
        .filter((b) => b)
        .filter((b) =>
          BADGE_VARIANT_TIER_MAP[b!.variant] === 'easterEgg' ? b!.achievedAt : true,
        ) as AchievedBadgeProps[];
    }, [loading, seasonBadgeVariants, badges]);

    const achievedBadges = badgesMemo.filter((aB) => aB.achievedAt);
    const collectionBadges = badgesMemo.filter(
      (aB) => NON_PROGRAMMATIC_BADGES.indexOf(aB.variant as NonProgrammaticBadges) === -1,
    );
    const communityEngagementBadges = badgesMemo.filter(
      (aB) => NON_PROGRAMMATIC_BADGES.indexOf(aB.variant as NonProgrammaticBadges) !== -1,
    );
    const notClaimedBadges = achievedBadges.filter((b) => !b.claimedAt);
    const handleSmoothScroll = React.useCallback((variant: BadgeVariant) => {
      badgeCardRefs.current[variant]?.scrollIntoView();
    }, []);
    return (
      <ContainerBox>
        <Typography colorToken="lavenderWeb" typographyToken="primaryHeader1Black">
          {`Welcome to your profile ${formatEthereumAddress(account)}`}
        </Typography>
        <Subheading
          colorToken="lavenderWeb2"
          data-testid="Profile-BadgesExplained"
          typographyToken="primaryBodyMediumRegular"
        >
          Earn badges through your contribution to the community and activity on the protocol.
          Badges are earned throughout each Season, with minting available at the end of each
          Season. The more you collect the greater your contribution.{' '}
          <HighlightedText>{seasonLabel}</HighlightedText> {isOnGoingSeason ? 'runs' : 'ran'}{' '}
          between <HighlightedText>{seasonStartDateFormatted}</HighlightedText> and{' '}
          <HighlightedText>{seasonEndDateFormatted}</HighlightedText>.
        </Subheading>
        <NotificationSection
          claimButtonBulkMode={claimButtonBulkMode}
          copyLinkButtonMode={copyLinkButtonMode}
          isOnGoingSeason={isOnGoingSeason}
          notClaimedBadgesCount={notClaimedBadges.length}
          onClaimBulkClick={() => onClaimBulkClick(notClaimedBadges.map((b) => b.variant))}
          onCopyLinkButtonClick={onCopyLinkButtonClick}
        />
        <BadgesBox>
          <BadgeCollectionBox data-testid="ProfilePageWalletConnected-BadgeCollectionBox">
            <BadgeCollectionTypographyBox>
              <Typography colorToken="lavenderWeb" typographyToken="primaryHeader2Black">
                Your Badge Collection
              </Typography>
              <SeasonToggle season={season} seasons={seasonOptions} onChange={onSeasonChange} />
            </BadgeCollectionTypographyBox>
            <AchievedBadgesGrid itemsPerRow={!loading && achievedBadges.length === 0 ? 1 : 3}>
              {loading &&
                Array.from({ length: 3 }, (index) => index).map((_, index) => (
                  <BadgeCard
                    key={index}
                    claimButtonMode="claim"
                    disableClaiming={true}
                    loading={loading}
                    variant="degenStuff"
                  />
                ))}
              {!loading &&
                achievedBadges.length !== 0 &&
                achievedBadges.map((badge, index) => (
                  <BadgeCard
                    key={`${badge.variant}${index}`}
                    ref={(ref: BadgeCardHandle) => (badgeCardRefs.current[badge.variant] = ref)}
                    claimButtonMode={claimButtonModes[badge.variant] || 'claim'}
                    claimedAt={badge.claimedAt}
                    disableClaiming={isOnGoingSeason}
                    loading={loading}
                    variant={badge.variant}
                    onClaimButtonClick={() => onClaimButtonClick(badge.variant)}
                  />
                ))}
              {!loading && achievedBadges.length === 0 && (
                <NoAchievedBadgesBox>
                  <Badge variant="noClaimedBadges" />
                  <NoAchievedBadgesTypography
                    colorToken="lavenderWeb2"
                    typographyToken="primaryBodyMediumRegular"
                  >
                    Make contributions to the community or trade on the protocol to earn badges
                  </NoAchievedBadgesTypography>
                </NoAchievedBadgesBox>
              )}
            </AchievedBadgesGrid>
          </BadgeCollectionBox>

          <AchievedBadgesListBox data-testid="ProfilePageWalletConnected-AchievedBadgesListBox">
            <Typography colorToken="lavenderWeb" typographyToken="primaryHeader2Black">
              The Collection -&nbsp;{seasonLabel}
            </Typography>
            <AchievedBadgesListSubheading
              colorToken="lavenderWeb2"
              typographyToken="primaryBodyMediumRegular"
            >
              Make contributions to the community or trade on the protocol to earn badges{' '}
            </AchievedBadgesListSubheading>
            <AchievedBadgesListGrid
              data-testid="ProfilePageWalletConnected-AchievedBadgesListGrid"
              itemsPerRow={1}
            >
              {collectionBadges.map((badge, index) => (
                <AchievedBadge
                  key={`${badge.variant}${index}`}
                  {...badge}
                  loading={loading}
                  onClick={() => handleSmoothScroll(badge.variant)}
                />
              ))}
            </AchievedBadgesListGrid>
          </AchievedBadgesListBox>

          <CommunityEngagementBox data-testid="ProfilePageWalletConnected-CommunityEngagementBox">
            <Typography colorToken="lavenderWeb" typographyToken="primaryHeader2Black">
              Community Engagement
            </Typography>
            <CommunityEngagementGrid
              data-testid="ProfilePageWalletConnected-CommunityEngagementGrid"
              itemsPerRow={1}
            >
              {communityEngagementBadges.map((badge, index) => (
                <AchievedBadge
                  key={`${badge.variant}${index}`}
                  {...badge}
                  loading={loading}
                  onClick={() => handleSmoothScroll(badge.variant)}
                />
              ))}
            </CommunityEngagementGrid>
          </CommunityEngagementBox>
        </BadgesBox>
      </ContainerBox>
    );
  };
