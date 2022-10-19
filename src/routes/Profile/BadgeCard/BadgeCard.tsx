import { colors } from '@theme';
import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@components/atomic';
import { Badge } from '../Badge/Badge';
import { BadgePill } from '../BadgePill/BadgePill';
import { BADGE_VARIANT_DESCRIPTION_COPY_MAP, BADGE_VARIANT_TITLE_COPY_MAP } from '../helpers';
import Skeleton from '@mui/material/Skeleton';
import { BadgeVariant } from '@graphql';

export type BadgeCardProps = {
  variant: BadgeVariant;
  loading?: boolean;
};

export const BadgeCard: React.FunctionComponent<BadgeCardProps> = ({ loading, variant }) => {
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
        <BadgePill loading={loading} variant={variant} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: (theme) => theme.spacing(6),
        }}
      >
        <Badge loading={loading} variant={variant} />
      </Box>
      {loading ? (
        <Skeleton variant="text" sx={{ fontSize: '18px', lineHeight: '24px' }} />
      ) : (
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
      )}
      {loading ? (
        <Skeleton variant="text" sx={{ fontSize: '12px', lineHeight: '18px' }} />
      ) : (
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
      )}
    </Box>
  );
};
