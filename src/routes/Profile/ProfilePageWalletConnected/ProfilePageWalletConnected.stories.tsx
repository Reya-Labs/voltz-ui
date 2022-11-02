import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfilePageWalletConnected } from './ProfilePageWalletConnected';
import { season1Badges, seasonOGBadges } from './ProfilePageWalletConnected.mocks';
import { SEASON_BADGE_VARIANTS } from '../helpers';
import { SEASONS } from '../../../hooks/season/constants';
import { Season } from '../../../hooks/season/types';
import { BadgeVariant } from '@graphql';
import { ClaimButtonProps } from '../ClaimButton/ClaimButton';

export default {
  title: 'Interface/ProfilePageWalletConnected',
  component: ProfilePageWalletConnected,
  args: {},
} as ComponentMeta<typeof ProfilePageWalletConnected>;

const Template: ComponentStory<typeof ProfilePageWalletConnected> = (args) => {
  const [season, setSeason] = useState<Season>(args.season);
  const [claimButtonModes, setClaimButtonModes] = useState<
    Record<BadgeVariant, ClaimButtonProps['mode']>
  >(
    SEASON_BADGE_VARIANTS[season.id].reduce(
      (pV, cI) => ({
        ...pV,
        [cI as BadgeVariant]: 'claim',
      }),
      {} as Record<BadgeVariant, ClaimButtonProps['mode']>,
    ),
  );

  function handleOnClaimButtonClick(variant: BadgeVariant) {
    setClaimButtonModes((prev) => ({
      ...prev,
      [variant]: 'claiming',
    }));
    // fake minting
    setTimeout(() => {
      setClaimButtonModes((prev) => ({
        ...prev,
        [variant]: 'claimed',
      }));
    }, 1500);
  }

  return (
    <ProfilePageWalletConnected
      {...args}
      season={season}
      seasonBadgeVariants={SEASON_BADGE_VARIANTS[season.id]}
      onSeasonChange={setSeason}
      isOnGoingSeason={season.id !== 0}
      claimButtonModes={claimButtonModes}
      onClaimButtonClick={handleOnClaimButtonClick}
      achievedBadges={season.id === 0 ? seasonOGBadges : season1Badges}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  account: '0xb01F14d1C9000D453241221EB54648F1C378c970',
  achievedBadges: season1Badges,
  season: SEASONS[1],
  seasonOptions: [SEASONS[0], SEASONS[1]],
};

export const Loading = Template.bind({});
Loading.args = {
  account: '0xb01F14d1C9000D453241221EB54648F1C378c970',
  achievedBadges: season1Badges,
  season: SEASONS[1],
  loading: true,
  isOnGoingSeason: true,
  seasonBadgeVariants: SEASON_BADGE_VARIANTS[1],
  seasonOptions: [SEASONS[0], SEASONS[1]],
};
