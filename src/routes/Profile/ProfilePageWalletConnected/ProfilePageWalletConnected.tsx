import React from 'react';
import { Typography } from '@components/atomic';
import { doNothing, elideAddress, formatDateTimeWithOrdinal } from '@utilities';
import { BadgeCard } from '../BadgeCard/BadgeCard';
import { Page } from '@components/interface';
import { AchievedBadge, AchievedBadgeProps } from '../AchievedBadge/AchievedBadge';
import { BADGE_VARIANT_TIER_MAP, COMING_SOON_BADGES } from '../helpers';
import { Badge } from '../Badge/Badge';
import { BadgeVariant } from '@graphql';
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
  ComingSoonBox,
  ComingSoonGrid,
  ComingSoonTypography,
  ContainerBox,
  Heading,
  NoAchievedBadgesBox,
  NoAchievedBadgesTypography,
  Subheading,
} from './ProfilePageWalletConnected.styled';
import { Season } from '../../../hooks/season/types';
import { SeasonToggle } from '../SeasonToggle/SeasonToggle';
import { ClaimButtonProps } from '../ClaimButton/ClaimButton';
import { ClaimSection } from '../ClaimSection/ClaimSection';
import { BoldText } from '../BoldText.styled';

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
  }) => {
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
          <ClaimSection
            isOnGoingSeason={isOnGoingSeason}
            notClaimedBadgesCount={notClaimedBadges.length}
            claimButtonBulkMode={claimButtonBulkMode}
            onClaimBulkClick={() =>
              onClaimBulkClick(notClaimedBadges.map((b) => b.variant as BadgeVariant))
            }
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
                    key={`${badge.variant}${index}`}
                    variant={badge.variant as BadgeVariant}
                    loading={loading}
                    onClaimButtonClick={() => onClaimButtonClick(badge.variant as BadgeVariant)}
                    claimButtonMode={claimButtonModes[badge.variant as BadgeVariant] || 'claim'}
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
                <AchievedBadge key={`${badge.variant}${index}`} {...badge} loading={loading} />
              ))}
            </AchievedBadgesListGrid>
          </AchievedBadgesListBox>

          <ComingSoonBox>
            <ComingSoonTypography variant="h2">COMING SOON</ComingSoonTypography>
            <ComingSoonGrid itemsPerRow={1}>
              {COMING_SOON_BADGES.map((badge, index) => (
                <AchievedBadge key={`${badge}${index}`} variant={badge} loading={loading} />
              ))}
            </ComingSoonGrid>
          </ComingSoonBox>
        </ContainerBox>
      </Page>
    );
  };
