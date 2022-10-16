import { colors } from '@theme';
import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@components/atomic';
import { BadgeVariant } from '../types';
import { BadgePill } from '../BadgePill/BadgePill';
import { BADGE_VARIANT_TITLE_COPY_MAP } from '../helpers';

export type CollectionBadgeProps = {
  achievedAt?: string;
  variant: BadgeVariant;
};
export const CollectionBadge: React.FunctionComponent<CollectionBadgeProps> = ({
  achievedAt,
  variant,
}) => (
  <Box
    data-testid={`CollectionBadge-${variant}`}
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
        width: '100px',
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
      {achievedAt ? `Achieved: ${achievedAt}` : 'Keep trading...'}
    </Typography>
  </Box>
);
