import React from 'react';
import { Button, Typography } from '@components/atomic';
import { Grid } from '@components/layout';
import Box from '@mui/material/Box';
import { Page } from '@components/interface';
import colors from '../../theme/colors';
import Badge1 from './assets/badge1.svg';
import Badge2 from './assets/badge2.svg';
import Badge3 from './assets/badge3.svg';

type BadgeProps = {
  variant: 'badge1' | 'badge2' | 'badge3';
  size: 'small' | 'large';
};

const BADGE_MAP: Record<BadgeProps['variant'], string> = {
  badge1: Badge1,
  badge2: Badge2,
  badge3: Badge3,
};
const TIER_COLOR_MAP: Record<BadgeCardProps['tier'], string> = {
  tier1: colors.wildStrawberry.base,
  tier2: colors.orangeYellow.base,
  tier3: colors.skyBlueCrayola.base,
};
const TIER_COPY_MAP: Record<BadgeCardProps['tier'], string> = {
  tier1: 'TIER 1',
  tier2: 'TIER 2',
  tier3: 'TIER 3',
};
const Badge: React.FunctionComponent<BadgeProps> = ({ size, variant }) => {
  const sizePx = size === 'small' ? '24px' : '48px';
  return (
    <img
      src={BADGE_MAP[variant]}
      alt="badge"
      style={{
        width: sizePx,
        height: sizePx,
      }}
    />
  );
};

type BadgeCardProps = {
  variant: BadgeProps['variant'];
  title: string;
  description: string;
  tier: 'tier1' | 'tier2' | 'tier3';
  achievedAt: string;
};
const BadgeCard: React.FunctionComponent<BadgeCardProps> = ({
  variant,
  title,
  description,
  tier,
  achievedAt,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: `#19152A`,
        borderRadius: (theme) => theme.spacing(1),
        border: '1px solid #2D2B3D',
        padding: (theme) => theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: (theme) => theme.spacing(2),
        }}
      >
        <Badge size="large" variant={variant} />
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: colors.lavenderWeb.base,
          fontSize: '14px',
          lineHeight: '24px',
          fontWeight: 700,
        }}
      >
        {title.toUpperCase()}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: TIER_COLOR_MAP[tier],
          fontSize: '12px',
          lineHeight: '18px',
          fontWeight: 700,
        }}
      >
        {TIER_COPY_MAP[tier]}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: colors.wildStrawberry.base,
          fontSize: '12px',
          lineHeight: '18px',
          fontWeight: 400,
        }}
      >
        ACHIEVED: {achievedAt}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: colors.lavenderWeb.darken015,
          fontSize: '12px',
          lineHeight: '18px',
          fontWeight: 400,
          marginTop: (theme) => theme.spacing(2),
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

const formatAddress = (address: string) => {
  return `${address.substring(0, 8) + '...' + address.substring(36)}`;
};

type Badge = {
  variant: BadgeProps['variant'];
  title: string;
  description: string;
  tier: 'tier1' | 'tier2' | 'tier3';
  achievedAt: string;
};
const claimedBadges: Badge[] = [
  {
    title: 'Open a FT position',
    variant: 'badge1',
    tier: 'tier1',
    achievedAt: '10/03/2022',
    description: 'Taking no risks, opening your first Fixed Taker position.',
  },
  {
    title: 'Open a VT position',
    variant: 'badge2',
    tier: 'tier1',
    achievedAt: '11/03/2022',
    description: 'Looking to collectat that juicy delta. Opening your first VT position',
  },
  {
    title: '100x LEVERAGE',
    variant: 'badge3',
    tier: 'tier2',
    achievedAt: '11/03/2022',
    description: 'Looking to collectat that juicy delta. Opening your first VT position',
  },
  {
    title: 'Open a FT position',
    variant: 'badge1',
    tier: 'tier1',
    achievedAt: '10/03/2022',
    description: 'Taking no risks, opening your first Fixed Taker position.',
  },
  {
    title: 'Open a VT position',
    variant: 'badge2',
    tier: 'tier3',
    achievedAt: '11/03/2022',
    description: 'Looking to collectat that juicy delta. Opening your first VT position',
  },
  {
    title: '100x LEVERAGE',
    variant: 'badge3',
    tier: 'tier2',
    achievedAt: '11/03/2022',
    description: 'Looking to collectat that juicy delta',
  },
];
const unclaimedBadges: Badge[] = [
  {
    title: 'Open a FT position',
    variant: 'badge1',
    tier: 'tier1',
    achievedAt: '10/03/2022',
    description: 'Taking no risks, opening your first Fixed Taker position.',
  },
  {
    title: 'Open a VT position',
    variant: 'badge2',
    tier: 'tier1',
    achievedAt: '11/03/2022',
    description: 'Looking to collectat that juicy delta. Opening your first VT position',
  },
  {
    title: '100x LEVERAGE',
    variant: 'badge3',
    tier: 'tier2',
    achievedAt: '11/03/2022',
    description: 'Looking to collectat that juicy delta. Opening your first VT position',
  },
];

const Profile: React.FunctionComponent = () => {
  return (
    <Page>
      <Box
        sx={{
          width: '594px',
          margin: '0 auto',
          background: 'transparent',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '40px',
            lineHeight: '1.2',
          }}
        >
          VOLTZ COMMUNITY ON CHAIN
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginTop: (theme) => theme.spacing(2),
            color: colors.lavenderWeb.darken015,
          }}
        >
          Compete against other traders for rewards by trading or bringing people to the platform.
        </Typography>
        <Box
          sx={{
            backgroundColor: `#19152A`,
            borderRadius: (theme) => theme.spacing(1),
            border: '1px solid #2D2B3D',
            padding: (theme) => theme.spacing(4),
            marginTop: (theme) => theme.spacing(6),
          }}
        >
          <Typography variant="h4">WELCOME TO VOLTZ COMMUNITY</Typography>
          <Typography
            variant="body2"
            sx={{
              marginTop: (theme) => theme.spacing(2),
              color: colors.lavenderWeb.darken015,
            }}
          >
            Compete against other traders for rewards by trading or bringing people to the platform.
          </Typography>
          <Box
            sx={{
              marginTop: (theme) => theme.spacing(6),
              display: 'flex',
              justifyContent: 'center',
              columnGap: (theme) => theme.spacing(2),
              alignItems: 'center',
            }}
          >
            <Badge variant="badge1" size="small" />
            <Typography
              variant="body2"
              sx={{
                color: colors.lavenderWeb.base,
                fontSize: '18px',
                fontWeight: 700,
                lineHeight: '14px',
              }}
            >
              {formatAddress('0x71C7656EC7ab88b098defB751B7401B5f6d8976F')}
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: (theme) => theme.spacing(3),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="text"
              sx={{
                fontSize: '14px',
                lineHeight: '20px',
                color: colors.skyBlueCrayola.base,
              }}
              onClick={() => {}}
            >
              CHECK BADGE AVAILABILITY
            </Button>
          </Box>
          <Box
            sx={{
              backgroundColor: '#1E1932',
              borderRadius: (theme) => theme.spacing(1),
              border: '1px solid #2D2B3D',
              padding: (theme) => theme.spacing(4),
              marginTop: (theme) => theme.spacing(3),
            }}
          >
            <Typography variant="h4">Your COLLECTION</Typography>
            <Grid
              itemsPerRow={3}
              sx={{
                marginTop: (theme) => theme.spacing(6),
                rowGap: (theme) => theme.spacing(6),
                columnGap: (theme) => theme.spacing(4),
              }}
            >
              {claimedBadges.map((badge) => (
                <BadgeCard {...badge} />
              ))}
            </Grid>
          </Box>

          <Box
            sx={{
              backgroundColor: '#1E1932',
              borderRadius: '4px',
              border: '1px solid #2D2B3D',
              padding: (theme) => theme.spacing(4, 4, 1, 4),
              marginTop: (theme) => theme.spacing(6),
            }}
          >
            <Typography variant="h4">CONGRATS! YOU HAVE AVAILABLE BADGES TO CLAIM</Typography>
            <Grid
              itemsPerRow={3}
              sx={{
                marginTop: (theme) => theme.spacing(6),
                rowGap: (theme) => theme.spacing(6),
                columnGap: (theme) => theme.spacing(4),
              }}
            >
              {unclaimedBadges.map((badge) => (
                <BadgeCard {...badge} />
              ))}
            </Grid>
            <Typography
              variant="body2"
              sx={{
                marginTop: (theme) => theme.spacing(6),
                color: colors.lavenderWeb.darken015,
              }}
            >
              THIS ARE BADGES YOU HAVE ACCRUED WITH YOUR TRADES.
            </Typography>
            <Box
              sx={{
                marginTop: (theme) => theme.spacing(3),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                variant="text"
                sx={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: colors.skyBlueCrayola.base,
                }}
                onClick={() => {}}
              >
                CLAIM
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default Profile;
