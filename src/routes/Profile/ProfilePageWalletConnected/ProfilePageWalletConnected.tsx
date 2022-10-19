import React from 'react';
import Box from '@mui/material/Box';
import { Pill, Typography } from '@components/atomic';
import { Grid } from '@components/layout';
import { elideAddress } from '@utilities';
import { BadgeCard, BadgeCardProps } from '../BadgeCard/BadgeCard';
import { colors } from '@theme';
import { Page } from '@components/interface';
import { CollectionBadge, CollectionBadgeProps } from '../CollectionBadge/CollectionBadge';
import {
  BADGE_VARIANT_DESCRIPTION_COPY_MAP,
  BADGE_VARIANT_TIER_MAP,
  BADGE_VARIANT_TITLE_COPY_MAP,
  COMING_SOON_BADGES,
} from '../helpers';
import { Badge } from '../Badge/Badge';

type ProfilePageProps = {
  account: string;
  claimedBadges: BadgeCardProps[];
  collection: CollectionBadgeProps[];
  season?: string;
  loading?: boolean;
};

const collectionBadgesSort = [
  'noRiskHereSer',
  'deltaDegen',
  'leverageCrowbar',
  'irsConnoisseur',
  'sushiRoll',
  'degenStuff',
  'seasonedTrader',
  'okBoomer',
  'dryIce',
  'maxBidding',
  'sugarDaddy',
  'lpoor',
  'moneyMoneyMoney',
  'waterHose',
  'rainMaker',
  'beWaterMyFriend',
];

export const ProfilePageWalletConnected: React.FunctionComponent<ProfilePageProps> = ({
  account,
  claimedBadges,
  season,
  collection,
  loading,
}) => {
  const collections: CollectionBadgeProps[] = React.useMemo(() => {
    return collectionBadgesSort
      .map((variant) => collection.find((c) => c.variant === variant))
      .filter((b) => b)
      .filter((b) =>
        BADGE_VARIANT_TIER_MAP[b!.variant] === 'easterEgg' ? b!.achievedAt : true,
      ) as CollectionBadgeProps[];
  }, [collection]);

  return (
    <Page>
      <Box
        sx={{
          width: '724px',
          margin: '0 auto',
          background: 'transparent',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 400,
          }}
        >
          WELCOME TO YOUR PROFILE&nbsp;
          <span
            style={{
              fontWeight: 700,
            }}
          >
            {elideAddress(account.toUpperCase())}
          </span>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginTop: (theme) => theme.spacing(2),
            lineHeight: '160%',
            fontSize: '14px',
            fontFamily: 'DM Sans',
            fontWeight: 400,
            color: colors.lavenderWeb.darken015,
          }}
        >
          Earn badges through your contribution to the community and activity on the protocol.
          Badges are earnt throughout each Season, with minting available at the end of each Season.
          The more you collect the greater your contribution. Season 1 will run until the 31st
          December 2022.
        </Typography>
        <Box
          sx={{
            marginTop: (theme) => theme.spacing(6),
            backgroundColor: '#19152A',
            borderRadius: '8px',
            padding: (theme) => theme.spacing(2, 4),
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: colors.lavenderWeb.darken015,
            }}
          >
            <Pill
              text="CLAIM"
              variant="wildStrawberry"
              sx={{
                marginRight: (theme) => theme.spacing(2),
              }}
            />
            UNAVAILABLE UNTIL THE END OF THE SEASON.
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: '#1E1932',
            borderRadius: '8px',
            padding: (theme) => theme.spacing(4),
            marginTop: (theme) => theme.spacing(3),
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h2">YOUR BADGE COLLECTION</Typography>
            {season && (
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '14px',
                  fontFamily: 'PixelOperatorMono',
                  padding: (theme) => theme.spacing(1, 2),
                }}
              >
                Season {season}
              </Typography>
            )}
          </Box>
          <Grid
            itemsPerRow={!loading && claimedBadges.length === 0 ? 1 : 3}
            sx={{
              marginTop: (theme) => theme.spacing(6),
              rowGap: (theme) => theme.spacing(6),
              columnGap: (theme) => theme.spacing(4),
            }}
          >
            {loading &&
              Array.from({ length: 3 }, (index) => index).map((_, index) => (
                <BadgeCard key={index} loading={loading} variant="degenStuff" />
              ))}
            {!loading &&
              claimedBadges.length !== 0 &&
              claimedBadges.map((badge, index) => (
                <BadgeCard key={`${badge.variant}${index}`} {...badge} loading={loading} />
              ))}
            {!loading && claimedBadges.length === 0 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Badge variant="noClaimedBadges" />
                <Typography
                  variant="body2"
                  sx={{
                    color: colors.lavenderWeb.base,
                    fontSize: '12px',
                    lineHeight: '18px',
                    fontWeight: 400,
                    marginTop: (theme) => theme.spacing(4),
                  }}
                >
                  Make contributions to the community or trade on the protocol to earn badges
                </Typography>
              </Box>
            )}
          </Grid>
        </Box>

        <Box
          sx={{
            padding: (theme) => theme.spacing(0, 4),
            marginTop: (theme) => theme.spacing(6),
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 400,
            }}
          >
            THE COLLECTION -&nbsp;
            {season && (
              <span
                style={{
                  fontWeight: 700,
                }}
              >
                SEASON {season}
              </span>
            )}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              marginTop: (theme) => theme.spacing(2),
              lineHeight: '160%',
              fontSize: '14px',
              fontFamily: 'DM Sans',
              fontWeight: 400,
              color: colors.lavenderWeb.darken015,
            }}
          >
            Make contributions to the community or trade on the protocol to earn badges{' '}
          </Typography>
          <Grid
            itemsPerRow={1}
            sx={{
              marginTop: (theme) => theme.spacing(6),
              rowGap: (theme) => theme.spacing(2),
            }}
          >
            {collections.map((badge, index) => (
              <CollectionBadge key={`${badge.variant}${index}`} {...badge} loading={loading} />
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            padding: (theme) => theme.spacing(0, 4),
            marginTop: (theme) => theme.spacing(6),
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 400,
            }}
          >
            COMING SOON
          </Typography>
          <Grid
            itemsPerRow={1}
            sx={{
              marginTop: (theme) => theme.spacing(6),
              rowGap: (theme) => theme.spacing(2),
            }}
          >
            {COMING_SOON_BADGES.map((badge, index) => (
              <CollectionBadge key={`${badge}${index}`} variant={badge} loading={loading} />
            ))}
          </Grid>
        </Box>
      </Box>
    </Page>
  );
};
