import colors from '../../../theme/colors';
import React from 'react';
import Box from '@mui/material/Box';
import { PillProps, Pill, Typography } from '@components/atomic';
import { Badge, BadgeProps } from '../Badge/Badge';

const TIER_PILL_VARIANT_MAP: Record<BadgeCardProps['tier'], PillProps['variant']> = {
  tier1: 'wildStrawberry',
  tier2: 'orangeYellow',
  tier3: 'skyBlueCrayola',
};
const TIER_COPY_MAP: Record<BadgeCardProps['tier'], string> = {
  tier1: 'TIER 1',
  tier2: 'TIER 2',
  tier3: 'TIER 3',
};

export type BadgeCardProps = {
  variant: BadgeProps['variant'];
  title: string;
  description: string;
  tier: 'tier1' | 'tier2' | 'tier3';
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
        <Pill text={TIER_COPY_MAP[tier]} variant={TIER_PILL_VARIANT_MAP[tier]} />
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
          color: colors.lavenderWeb,
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
