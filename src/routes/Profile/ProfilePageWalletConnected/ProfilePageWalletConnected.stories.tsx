import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfilePageWalletConnected } from './ProfilePageWalletConnected';
import { claimedBadges, collectionBadges } from '../mocks';

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
  claimedBadges,
  collection: collectionBadges,
  season: '1',
};

export const NoClaimedBadges = Template.bind({});
NoClaimedBadges.args = {
  account: '0xb01F14d1C9000D453241221EB54648F1C378c970',
  claimedBadges: [],
  collection: collectionBadges,
  season: '1',
};

export const Loading = Template.bind({});
Loading.args = {
  account: '0xb01F14d1C9000D453241221EB54648F1C378c970',
  claimedBadges: [],
  collection: [],
  season: '1',
  loading: true,
};
