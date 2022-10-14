import React from 'react';
import Box from '@mui/material/Box';
import { Grid, Pill, Typography, Page } from '../../../components';
import colors from '../../../theme/colors';
import { elideAddress } from '../../../utilities';
import { BadgeCard, BadgeCardProps } from '../BadgeCard/BadgeCard';

type ProfilePageProps = {
  account: string;
  claimedBadges: BadgeCardProps[];
};

export const ProfilePageWalletConnected: React.FunctionComponent<ProfilePageProps> = ({
  account,
  claimedBadges,
}) => (
  <Page>
    <Box
      sx={{
        width: '724px',
        margin: '0 auto',
        background: 'transparent',
      }}
    >
      <Typography variant="h1">WELCOME {elideAddress(account.toUpperCase())}</Typography>
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
        Compete against other traders for rewards by trading or bringing people to the platform.{' '}
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
            <BadgeCard key={`${badge.title} ${index}`} {...badge} />
          ))}
        </Grid>
      </Box>
    </Box>
  </Page>
);
