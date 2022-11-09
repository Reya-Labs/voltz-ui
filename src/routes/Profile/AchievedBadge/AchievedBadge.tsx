import React from 'react';
import Box from '@mui/material/Box';
import { BadgePill } from '../BadgePill/BadgePill';
import { BADGE_VARIANT_TITLE_COPY_MAP, COMING_SOON_BADGES } from '../helpers';
import {
  AchievedAtTypography,
  AchievedContainerBox,
  BadgePillBox,
  ContainerBox,
  Skeleton,
  TitleTypography,
} from './AchivedBadge.styled';
import { formatPOSIXTimestamp } from '@utilities';
import { BadgeVariant } from '@graphql';
import { ComingSoonBadges } from '../types';

export type AchievedBadgeProps = {
  achievedAt?: number;
  claimedAt?: number;
  variant: BadgeVariant | ComingSoonBadges;
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
    return <Skeleton data-testid="AchievedBadge-Skeleton" variant="rectangular" />;
  }
  const Container = Boolean(achievedAt) ? AchievedContainerBox : ContainerBox;
  return (
    <Container onClick={onClick} data-testid={`AchievedBadge-${variant}`}>
      <BadgePillBox>
        <Box>
          <BadgePill variant={variant} />
        </Box>
      </BadgePillBox>
      <TitleTypography variant="body2">
        {BADGE_VARIANT_TITLE_COPY_MAP[variant].toUpperCase()}
      </TitleTypography>
      <AchievedAtTypography variant="body2">
        {achievedAt
          ? `Achieved: ${formatPOSIXTimestamp(achievedAt)}`
          : COMING_SOON_BADGES.indexOf(variant as ComingSoonBadges) !== -1
          ? 'Contribute...'
          : 'Keep trading...'}
      </AchievedAtTypography>
    </Container>
  );
};
