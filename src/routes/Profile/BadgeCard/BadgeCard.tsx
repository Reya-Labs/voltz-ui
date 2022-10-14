import colors from '../../../theme/colors';
import React from 'react';
import Box from '@mui/material/Box';
import { PillProps, Pill, Typography } from '@components/atomic';
import { Badge } from '../Badge/Badge';
import { BadgeTier, BadgeVariant } from '../types';
import { BadgePill } from '../BadgePill/BadgePill';

export type BadgeCardProps = {
  variant: BadgeVariant;
  title: string;
  description: string;
  tier: BadgeTier;
};
export const BadgeCard: React.FunctionComponent<BadgeCardProps> = ({
  variant,
  title,
  description,
  tier,
}) => {
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
        <BadgePill tier={tier} />
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
        {title.toUpperCase()}
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
        {description}
      </Typography>
    </Box>
  );
};
