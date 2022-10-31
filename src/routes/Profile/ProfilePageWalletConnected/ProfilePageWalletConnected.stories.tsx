import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfilePageWalletConnected } from './ProfilePageWalletConnected';
import { season1Badges, seasonOGBadges } from './ProfilePageWalletConnected.mocks';
import { SEASON_BADGE_VARIANTS } from '../helpers';

export default {
  title: 'Interface/ProfilePageWalletConnected',
  component: ProfilePageWalletConnected,
  args: {},
} as ComponentMeta<typeof ProfilePageWalletConnected>;

const Template: ComponentStory<typeof ProfilePageWalletConnected> = (args) => (
  <ProfilePageWalletConnected {...args} />
);

export const Season01 = Template.bind({});
Season01.args = {
  account: '0xb01F14d1C9000D453241221EB54648F1C378c970',
  achievedBadges: season1Badges,
  seasonLabel: 'Season 01',
  seasonStartDateFormatted: '1st October 2022',
  seasonEndDateFormatted: '31st December 2022',
  isOnGoingSeason: true,
  seasonBadgeVariants: SEASON_BADGE_VARIANTS['s1'],
};

export const SeasonOG = Template.bind({});
SeasonOG.args = {
  account: '0xb01F14d1C9000D453241221EB54648F1C378c970',
  achievedBadges: seasonOGBadges,
  seasonLabel: 'Season OG',
  seasonStartDateFormatted: '1st June 2022',
  seasonEndDateFormatted: '30th September 2022',
  isOnGoingSeason: false,
  seasonBadgeVariants: SEASON_BADGE_VARIANTS['og'],
};

export const Loading = Template.bind({});
Loading.args = {
  account: '0xb01F14d1C9000D453241221EB54648F1C378c970',
  achievedBadges: season1Badges,
  seasonLabel: 'Season 01',
  loading: true,
  seasonStartDateFormatted: '1st October 2022',
  seasonEndDateFormatted: '31st December 2022',
  isOnGoingSeason: true,
  seasonBadgeVariants: SEASON_BADGE_VARIANTS['s1'],
};
