import React from 'react';
import Box from '@mui/material/Box';
import { BadgePill } from '../BadgePill/BadgePill';
import { BADGE_VARIANT_TITLE_COPY_MAP } from '../../helpers';
import {
  AchievedAtTypography,
  AchievedContainerBox,
  BadgePillBox,
  ContainerBox,
  Skeleton,
  TitleTypography,
} from './AchivedBadge.styled';
import { formatPOSIXTimestamp } from '@utilities';
import { BadgeVariant } from '../../data/getSeasonBadges';

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
        {achievedAt ? `Achieved: ${formatPOSIXTimestamp(achievedAt)}` : 'Keep trading...'}
      </AchievedAtTypography>
    </Container>
  );
};
