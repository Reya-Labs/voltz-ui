import React from 'react';

import { formatPOSIXTimestamp } from '../../../../../utilities/date';
import {
  BadgeVariant,
  NON_PROGRAMMATIC_BADGES_DISCORD,
  NonProgrammaticBadges,
} from '../../data/getSeasonBadges';
import { BADGE_VARIANT_TITLE_COPY_MAP } from '../../helpers';
import { BadgePill } from '../BadgePill/BadgePill';
import {
  AchievedAtTypography,
  AchievedContainerBox,
  BadgePillBox,
  ContainerBox,
  Skeleton,
  TitleTypography,
} from './AchivedBadge.styled';

export type AchievedBadgeProps = {
  achievedAt?: number;
  claimedAt?: number;
  variant: BadgeVariant;
  loading?: boolean;
  onClick?: () => void;
};
export const AchievedBadge: React.FunctionComponent<AchievedBadgeProps> = ({
  achievedAt,
  variant,
  loading,
  onClick,
}) => {
  if (loading) {
    return (
      <Skeleton
        colorToken="liberty2"
        data-testid="AchievedBadge-Skeleton"
        typographyToken="primaryBodyMediumRegular"
        variant="rectangular"
      />
    );
  }
  const Container = Boolean(achievedAt) ? AchievedContainerBox : ContainerBox;
  const achievedText = achievedAt
    ? `Achieved: ${formatPOSIXTimestamp(achievedAt)}`
    : 'Keep trading...';
  const awardedText = achievedAt
    ? `Awarded: ${formatPOSIXTimestamp(achievedAt)}`
    : 'Keep contributing...';

  return (
    <Container data-testid={`AchievedBadge-${variant}`} onClick={onClick}>
      <BadgePillBox>
        <div>
          <BadgePill variant={variant} />
        </div>
      </BadgePillBox>
      <TitleTypography colorToken="lavenderWeb" typographyToken="primaryBodyMediumRegular">
        {BADGE_VARIANT_TITLE_COPY_MAP[variant].toUpperCase()}
      </TitleTypography>
      <AchievedAtTypography colorToken="lavenderWeb" typographyToken="primaryBodyMediumRegular">
        {NON_PROGRAMMATIC_BADGES_DISCORD.indexOf(variant as NonProgrammaticBadges) !== -1
          ? awardedText
          : achievedText}
      </AchievedAtTypography>
    </Container>
  );
};
