import Badge1 from '../assets/badge1.svg';
import Badge2 from '../assets/badge2.svg';
import Badge3 from '../assets/badge3.svg';
import colors from '../../../theme/colors';
import React from 'react';
import Box from '@mui/material/Box';
import { PillProps, Pill, Typography } from '@components/*';

type BadgeProps = {
  variant: 'badge1' | 'badge2' | 'badge3';
};

const BADGE_MAP: Record<BadgeProps['variant'], string> = {
  badge1: Badge1,
  badge2: Badge2,
  badge3: Badge3,
};
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

const Badge: React.FunctionComponent<BadgeProps> = ({ variant }) => {
  return (
    <img
      data-testid={`Badge-${variant}`}
      src={BADGE_MAP[variant]}
      alt="badge"
      style={{
        width: '168px',
        height: '168px',
      }}
    />
  );
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
      data-testId="BadgeCard"
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
