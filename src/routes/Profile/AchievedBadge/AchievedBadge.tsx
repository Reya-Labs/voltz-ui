import { colors } from '@theme';
import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@components/atomic';
import { BadgePill } from '../BadgePill/BadgePill';
import { BADGE_VARIANT_TITLE_COPY_MAP, COMING_SOON_BADGES } from '../helpers';
import Skeleton from '@mui/material/Skeleton';
import { formatPOSIXTimestamp } from '@utilities';
import { BadgeVariant } from '@graphql';
import { ComingSoonBadges } from '../types';

export type AchievedBadgeProps = {
  achievedAt?: number;
  variant: BadgeVariant | ComingSoonBadges;
  loading?: boolean;
};
export const AchievedBadge: React.FunctionComponent<AchievedBadgeProps> = ({
  achievedAt,
  variant,
  loading,
}) =>
  loading ? (
    <Skeleton
      variant="rectangular"
      sx={{
        padding: (theme) => theme.spacing(2, 2, 2, 4),
        borderRadius: '8px',
        fontSize: '18px',
        lineHeight: '24px',
        width: '100%',
      }}
    />
  ) : (
    <Box
      data-testid={`AchievedBadge-${variant}`}
      sx={{
        backgroundColor: '#2B2548',
        borderRadius: '8px',
        padding: (theme) => theme.spacing(2, 2, 2, 4),
        display: 'flex',
        flexDirection: 'row',
        opacity: achievedAt ? 1 : 0.7,
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '150px',
          marginRight: (theme) => theme.spacing(2),
        }}
      >
        <Box>
          <BadgePill variant={variant} />
        </Box>
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: colors.lavenderWeb.base,
          fontSize: '18px',
          lineHeight: '24px',
          fontWeight: 400,
          flex: '1',
        }}
      >
        {BADGE_VARIANT_TITLE_COPY_MAP[variant].toUpperCase()}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: colors.lavenderWeb.base,
          fontSize: '18px',
          lineHeight: '24px',
          fontWeight: 400,
          padding: (theme) => theme.spacing(0, 4),
          textAlign: 'right',
        }}
      >
        {achievedAt
          ? `Achieved: ${formatPOSIXTimestamp(achievedAt)}`
          : COMING_SOON_BADGES.indexOf(variant as ComingSoonBadges) !== -1
          ? 'Contribute...'
          : 'Keep trading...'}
      </Typography>
    </Box>
  );
