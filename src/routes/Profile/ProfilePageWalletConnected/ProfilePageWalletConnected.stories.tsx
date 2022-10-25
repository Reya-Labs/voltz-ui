import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfilePageWalletConnected } from './ProfilePageWalletConnected';
import { collectionBadges } from '../mocks';

export default {
  title: 'Interface/ProfilePageWalletConnected',
  component: ProfilePageWalletConnected,
  args: {},
} as ComponentMeta<typeof ProfilePageWalletConnected>;

const Template: ComponentStory<typeof ProfilePageWalletConnected> = (args) => (
  <ProfilePageWalletConnected {...args} />
);

export const Default = Template.bind({});
Default.args = {
  account: '0xb01F14d1C9000D453241221EB54648F1C378c970',
  achievedBadges: collectionBadges,
  season: '01',
  seasonStartDateFormatted: '1st October 2022',
  seasonEndDateFormatted: '31st December 2022',
};

export const Loading = Template.bind({});
Loading.args = {
  account: '0xb01F14d1C9000D453241221EB54648F1C378c970',
  achievedBadges: collectionBadges,
  season: '01',
  loading: true,
  seasonStartDateFormatted: '1st October 2022',
  seasonEndDateFormatted: '31st December 2022',
};
