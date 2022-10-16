import React from 'react';
import Box from '@mui/material/Box';
import { Pill, Typography } from '@components/atomic';
import { Grid } from '@components/layout';
import { elideAddress } from '@utilities';
import { BadgeCard, BadgeCardProps } from '../BadgeCard/BadgeCard';
import { colors } from '@theme';
import { Page } from '@components/interface';
import { CollectionBadge, CollectionBadgeProps } from '../CollectionBadge/CollectionBadge';
import { BADGE_VARIANT_TIER_MAP } from '../helpers';

type ProfilePageProps = {
  account: string;
  claimedBadges: BadgeCardProps[];
  collection: CollectionBadgeProps[];
  season: string;
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
  const badgeCollections: CollectionBadgeProps[] = React.useMemo(() => {
    return collectionBadgesSort
      .map((variant) => collection.find((c) => c.variant === variant))
      .filter((b) => b)
      .filter((b) =>
        BADGE_VARIANT_TIER_MAP[b!.variant] === '???' ? b!.achievedAt : true,
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
          WELCOME&nbsp;
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
          Compete against other traders for rewards by trading or bringing people to the platform.
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
              text="WEN CLAIMING"
              variant="wildStrawberry"
              sx={{
                marginRight: (theme) => theme.spacing(2),
              }}
            />
            AT THE END OF THE SEASON YOU WILL BE ABLE TO CLAIM YOUR EARNED BADGES
          </Typography>
        </Box>
        {(claimedBadges || []).length !== 0 ? (
          <Box
            sx={{
              backgroundColor: '#1E1932',
              borderRadius: '8px',
              padding: (theme) => theme.spacing(4),
              marginTop: (theme) => theme.spacing(3),
            }}
          >
            <Typography variant="h2">YOUR BADGE ACHIEVEMENTS COLLECTION</Typography>
            <Grid
              itemsPerRow={3}
              sx={{
                marginTop: (theme) => theme.spacing(6),
                rowGap: (theme) => theme.spacing(6),
                columnGap: (theme) => theme.spacing(4),
              }}
            >
              {claimedBadges.map((badge, index) => (
                <BadgeCard key={`${badge.variant}${index}`} {...badge} loading={loading} />
              ))}
            </Grid>
          </Box>
        ) : null}

        {(badgeCollections || []).length !== 0 ? (
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
              <span
                style={{
                  fontWeight: 700,
                }}
              >
                SEASON {season}
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
              Compete against other traders for rewards by trading or bringing people to the
              platform.
            </Typography>
            <Grid
              itemsPerRow={1}
              sx={{
                marginTop: (theme) => theme.spacing(6),
                rowGap: (theme) => theme.spacing(2),
              }}
            >
              {badgeCollections.map((badge, index) => (
                <CollectionBadge key={`${badge.variant}${index}`} {...badge} loading={loading} />
              ))}
            </Grid>
          </Box>
        ) : null}
      </Box>
    </Page>
  );
};
