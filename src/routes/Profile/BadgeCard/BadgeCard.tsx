import { colors } from '@theme';
import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@components/atomic';
import { Badge } from '../Badge/Badge';
import { BadgeVariant } from '../types';
import { BadgePill } from '../BadgePill/BadgePill';
import { BADGE_VARIANT_DESCRIPTION_COPY_MAP, BADGE_VARIANT_TITLE_COPY_MAP } from '../helpers';

export type BadgeCardProps = {
  variant: BadgeVariant;
};

export const BadgeCard: React.FunctionComponent<BadgeCardProps> = ({ variant }) => {
  return (
    <Box
      data-testid="BadgeCard"
      sx={{
        backgroundColor: '#19152A',
        borderRadius: '4px',
        padding: (theme) => theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          marginBottom: (theme) => theme.spacing(6),
        }}
      >
        <BadgePill variant={variant} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: (theme) => theme.spacing(6),
        }}
      >
        <Badge variant={variant} />
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: colors.lavenderWeb.base,
          fontSize: '18px',
          lineHeight: '24px',
          fontWeight: 700,
          marginBottom: (theme) => theme.spacing(2),
        }}
      >
        {BADGE_VARIANT_TITLE_COPY_MAP[variant].toUpperCase()}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: colors.lavenderWeb.base,
          fontSize: '12px',
          lineHeight: '18px',
          fontWeight: 400,
        }}
      >
        {BADGE_VARIANT_DESCRIPTION_COPY_MAP[variant]}
      </Typography>
    </Box>
  );
};
