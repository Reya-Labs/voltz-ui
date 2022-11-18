import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfilePageWalletConnected } from './ProfilePageWalletConnected';
import { season1Badges } from './ProfilePageWalletConnected.mocks';
import { SEASONS } from '../../../hooks/season/constants';
import { SEASON_BADGE_VARIANTS } from '../getters/getPhase1Badges';

export default {
  title: 'Interface/ProfilePageWalletConnectedV1',
  component: ProfilePageWalletConnected,
  args: {},
} as ComponentMeta<typeof ProfilePageWalletConnected>;

const Template: ComponentStory<typeof ProfilePageWalletConnected> = (args) => {
  return <ProfilePageWalletConnected {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  account: '0xb01F14d1C9000D453241221EB54648F1C378c970',
  achievedBadges: season1Badges,
  season: SEASONS[1],
  seasonBadgeVariants: SEASON_BADGE_VARIANTS[1],
};

export const Loading = Template.bind({});
Loading.args = {
  account: '0xb01F14d1C9000D453241221EB54648F1C378c970',
  achievedBadges: season1Badges,
  season: SEASONS[1],
  loading: true,
  seasonBadgeVariants: SEASON_BADGE_VARIANTS[1],
};
