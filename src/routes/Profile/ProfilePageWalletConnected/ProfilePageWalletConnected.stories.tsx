import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfilePageWalletConnected } from './ProfilePageWalletConnected';
import { season1Badges, seasonOGBadges } from './ProfilePageWalletConnected.mocks';
import { SEASON_BADGE_VARIANTS } from '../helpers';
import { SEASONS } from '../../../hooks/season/constants';
import { Season } from '../../../hooks/season/types';

export default {
  title: 'Interface/ProfilePageWalletConnected',
  component: ProfilePageWalletConnected,
  args: {},
} as ComponentMeta<typeof ProfilePageWalletConnected>;

const Template: ComponentStory<typeof ProfilePageWalletConnected> = (args) => {
  const [season, setSeason] = useState<Season>(args.season);
  return (
    <ProfilePageWalletConnected
      {...args}
      season={season}
      seasonBadgeVariants={SEASON_BADGE_VARIANTS[season.id]}
      onSeasonChange={setSeason}
      isOnGoingSeason={season.id !== 'og'}
      achievedBadges={season.id === 'og' ? seasonOGBadges : season1Badges}
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
  seasonBadgeVariants: SEASON_BADGE_VARIANTS['s1'],
  seasonOptions: [SEASONS[0], SEASONS[1]],
};
